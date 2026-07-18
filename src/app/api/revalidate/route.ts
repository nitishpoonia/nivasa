import { revalidateTag } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { NextResponse, type NextRequest } from "next/server";

import { config } from "@/lib/config/env";
import { CACHE_TAGS, type CmsDocumentType } from "@/lib/cms";

type WebhookPayload = {
  _type?: string;
};

function isCmsDocumentType(
  value: string | undefined,
): value is CmsDocumentType {
  return value !== undefined && value in CACHE_TAGS;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = config.sanity.revalidateSecret;
  if (!secret) {
    return NextResponse.json(
      { message: "Revalidation secret is not configured" },
      { status: 500 },
    );
  }

  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);

  if (!signature || !(await isValidSignature(body, signature, secret))) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(body) as WebhookPayload;
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (!isCmsDocumentType(payload._type)) {
    return NextResponse.json(
      { message: `No cache tag mapped for type "${payload._type}"` },
      { status: 200 },
    );
  }

  const tag = CACHE_TAGS[payload._type];
  // "max" expires the tag immediately, matching pre-Next-16 single-arg revalidateTag behavior.
  revalidateTag(tag, "max");

  return NextResponse.json({ revalidated: true, tag });
}
