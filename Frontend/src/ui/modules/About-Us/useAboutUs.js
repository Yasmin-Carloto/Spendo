import ruthImage from "@/ui/assets/ruth-image.jpg"
import sabrinnaImage from "@/ui/assets/sabrinna-image.jpg"
import victorImage from "@/ui/assets/victor-image.jpg"
import yasminImage from "@/ui/assets/yasmin-image.jpg"
import { useSidebarStore } from "@/ui/stores/side-bar.store"
import sidebarMenuItems from "@/ui/utils/sidebar-items"
import { useEffect } from "react"

export default function useAboutUs() {
    const setActiveTab = useSidebarStore((state) => state.setActiveTab)

    useEffect(() => {
        setActiveTab(sidebarMenuItems[6].title)
    }, [])

    const teamMembers = [
        { name: "Ruth Rodrigues", image: ruthImage },
        { name: "Sabrinna Facundo", image: sabrinnaImage },
        { name: "Victor Gabriel", image: victorImage },
        { name: "Yasmin Carlôto", image: yasminImage }
    ]

    const questionsAndAnswers = [
        {
            question: "Quem somos?",
            answer: "Somos um grupo de estudantes do curso técnico integrado em informática do IFCE - Campus Fortaleza. Acreditamos que o conhecimento financeiro deve estar ao alcance de todos, de forma simples e prática. Por isso, criamos o Spendo, uma plataforma que ajuda você a controlar seus gastos, planejar suas metas e tomar decisões financeiras mais conscientes. Nosso time é formado por pessoas dedicadas a transformar a forma como você se relaciona com o dinheiro. Estamos sempre em busca de inovação e aprendizado para oferecer a melhor experiência possível aos nossos usuários."
        }, 
        {
            question: "Sobre o Spendo",
            answer: "O Spendo é uma plataforma desenvolvida para tornar o controle financeiro algo simples, prático e eficiente para todos os usuários. Com ele, você pode registrar suas transações diárias, acompanhar suas receitas e despesas, criar metas financeiras personalizadas e entender melhor seus hábitos de consumo para tomar decisões mais conscientes e responsáveis. Este projeto nasceu como uma iniciativa acadêmica para a disciplina de Prática Profissional III, ministrada pelo professor Carlos Maurício. A ideia foi desenvolver uma solução real que pudesse ajudar as pessoas a melhorar sua educação financeira, unindo conhecimentos técnicos e habilidades práticas adquiridas durante o curso. Ao usar o Spendo, você não apenas organiza suas finanças, mas também aprende a criar um planejamento financeiro saudável, promovendo maior controle, segurança e tranquilidade no seu dia a dia."
        },
    ]
    
    return {
        teamMembers,
        questionsAndAnswers,
    }
}