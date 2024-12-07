import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpPage() {
  const faqItems = [
    {
      question: "How do I earn coins?",
      answer: "You can earn coins by completing tasks, playing games, inviting friends, and checking in daily."
    },
    {
      question: "What are the benefits of upgrading to Premium?",
      answer: "Premium users enjoy 2x earning rates, ad-free experience, exclusive tasks, priority support, and early access to new features."
    },
    {
      question: "How does the referral system work?",
      answer: "Share your unique referral link with friends. When they join and start earning, you'll receive 10% of their earnings as a bonus."
    },
    {
      question: "I'm experiencing a technical issue. What should I do?",
      answer: "Please contact our support team through the app or send an email to support@notimpc.com with details about your issue."
    }
  ]

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Help & FAQ</h1>

        <Card className="bg-[#2B2E33] border-[#3A3D42]">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="bg-[#2B2E33] border-[#3A3D42]">
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Need more help? Reach out to our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[#8E8E93]">Email: support@notimpc.com</p>
            <p className="text-[#8E8E93]">Response time: Within 24 hours</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

