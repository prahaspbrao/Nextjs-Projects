// app/api/videos/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ✅ Correct way to import client

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const videoId = params.id;

  try {
    await prisma.video.delete({
      where: { id: videoId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete video:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete" },
      { status: 500 }
    );
  }
}
