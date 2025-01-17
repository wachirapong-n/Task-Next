import { NextResponse } from 'next/server'

export async function POST(req) {
  const form = await req.json()
  console.log(form)
  return NextResponse.json(form)
}