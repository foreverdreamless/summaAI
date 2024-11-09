'use client'

import React from 'react'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">About Our Tool</h1>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-lg mb-4">
            Our AI-powered summarization tool is designed to make reading easier by offering customizable summaries that fit your exact needs.
          </p>
          <p className="text-lg mb-4">
            Whether you're a student, professional, or just someone who wants to save time, our tool can help you quickly grasp the key points of any text.
          </p>
        </div>
        <div className="relative h-64 md:h-full">
          <Image
            src="/placeholder.svg"
            alt="Our team"
            fill
            className="rounded-lg object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
} 