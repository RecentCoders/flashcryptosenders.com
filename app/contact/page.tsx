import type { Metadata } from "next"
import { Mail, MapPin, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { StructuredData } from "@/components/structured-data"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Contact Us | Flash Crypto Senders",
  description: "Get in touch with our team for support, inquiries, or partnership opportunities.",
  alternates: {
    canonical: "https://flashcryptosenders.xyz/contact",
  },
}

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Flash Crypto Senders",
    description: "Get in touch with our team for support, inquiries, or partnership opportunities.",
    url: "https://flashcryptosenders.xyz/contact",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://flashcryptosenders.xyz/contact",
    },
  }

  return (
    <>
      <StructuredData data={structuredData} />

      <div className="container py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions or need assistance? Our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
              <p className="text-muted-foreground mb-6">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input id="first-name" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input id="last-name" placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help you?" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Your message here..." rows={5} required />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground mb-6">
                You can also reach out to us directly using the information below.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <Mail className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">support@flashcryptosenders.xyz</p>
                      <p className="text-muted-foreground">info@flashcryptosenders.xyz</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <Phone className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <MapPin className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-medium">Office</h3>
                      <p className="text-muted-foreground">123 Blockchain Avenue</p>
                      <p className="text-muted-foreground">San Francisco, CA 94103</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Office Location</h2>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/contact/office-map.webp"
                  alt="Office Location Map"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

