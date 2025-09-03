import { 
    Accordion, 
    AccordionContent, 
    AccordionItem, 
    AccordionTrigger 
} from "@/components/ui/accordion"
import useAboutUs from "./useAboutUs"

export default function AboutUs() {
  const { questionsAndAnswers, teamMembers } = useAboutUs()
  return (
    <section className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col text-left items-start justify-between mb-6">
            <h2 className="text-3xl font-bold text-main-green">Sobre Nós</h2>
            <p className="text-sm text-muted-foreground mb-8">Conheça quem está por trás do Spendo.</p>
        </div>

      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {teamMembers.map((member) => (
          <div key={member.name} className="flex flex-col items-center text-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-[170px] h-[170px] object-cover rounded-full"
            />
            <p className="mt-2 font-medium">{member.name}</p>
          </div>
        ))}
      </div>

      <Accordion type="single" collapsible className="w-full">
        {questionsAndAnswers.map((questionAndAnswer) => (
            <AccordionItem value={questionAndAnswer.question} key={questionAndAnswer.question}>
                <AccordionTrigger className="text-base font-semibold">
                    {questionAndAnswer.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                    {questionAndAnswer.answer}
                </AccordionContent>
            </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
