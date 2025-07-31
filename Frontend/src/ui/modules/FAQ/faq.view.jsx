import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import useFAQ from "./useFAQ"

export default function FAQ() {
  const { questionsAndAnswers } = useFAQ()
  return (
    <section className="max-w-6xl mx-auto p-4">
       <div className="flex flex-col text-left items-start justify-between">
        <h2 className="text-3xl font-bold text-main-green">Perguntas Frequentes (FAQ)</h2>
        <p className="text-sm text-muted-foreground mb-8">Encontre aqui informações de como mexer no site e algumas dicas de como melhorar seus hábitos de consumidor.</p>
       </div>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {questionsAndAnswers.map((questionAndAnswer) => (
            <AccordionItem value={questionAndAnswer.question}>
                <AccordionTrigger className="text-base font-semibold">{questionAndAnswer.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                    {questionAndAnswer.answer}
                </AccordionContent>
            </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
