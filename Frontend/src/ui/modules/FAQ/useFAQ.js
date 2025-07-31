import sidebarMenuItems from "@/ui/utils/sidebar-items"
import { useEffect } from "react"
import { useSidebarStore } from "@/ui/stores/side-bar.store"

export default function useFAQ() {
    const setActiveTab = useSidebarStore((state) => state.setActiveTab)
    
    useEffect(() => {
        setActiveTab(sidebarMenuItems[5].title)
    }, [])

    const questionsAndAnswers = [
        {
            question: "Como funciona o Spendo?",
            answer:
            "O Spendo é uma plataforma que ajuda você a organizar suas finanças pessoais, permitindo cadastrar suas transações, acompanhar suas metas financeiras e entender melhor seus hábitos de consumo para tomar decisões mais conscientes.",
        },
        {
            question: "Como cadastro uma nova transação?",
            answer:
            'Para cadastrar uma nova transação, vá até a seção "Transações" no menu lateral, clique em "Adicionar", preencha os dados como valor, categoria e descrição, e salve.',
        },
        {
            question: "Posso criar metas personalizadas?",
            answer:
            'Sim! Na seção "Metas", você pode definir objetivos financeiros personalizados, como economizar uma quantia específica ou reduzir gastos em determinada categoria. O Spendo acompanhará seu progresso.',
        },
        {
            question: "Como a plataforma protege meus dados?",
            answer:
            "Utilizamos protocolos de criptografia e armazenamos suas informações com segurança para garantir privacidade e proteção contra acessos não autorizados.",
        },
        {
            question: "O Spendo tem versão mobile?",
            answer:
            "Atualmente, o Spendo é otimizado para uso em navegadores móveis. Em breve, lançaremos aplicativos para Android e iOS.",
        },
        {
            question: "Posso exportar meus dados?",
            answer:
            "(Feature a ser implementada) Sim, você pode exportar seus dados financeiros em formatos como CSV para uso em planilhas ou outros softwares.",
        },
        {
            question: "Como alterar meu perfil?",
            answer:
            '(Feature a ser implementada) Acesse o menu "Perfil" no rodapé da sidebar para atualizar seus dados pessoais, senha e preferências.',
        },
        {
            question: "O que são categorias de transações?",
            answer:
            "Categorias como alimentação, transporte e lazer ajudam a organizar suas transações e analisar melhor seus gastos.",
        },
        {
            question: "Como recebo dicas personalizadas?",
            answer:
            'Na aba "Hábitos de Consumo", o Spendo analisa seu histórico de gastos e metas para sugerir ações que ajudem a melhorar sua saúde financeira.',
        },
        {
            question: "Como posso entrar em contato com suporte?",
            answer:
            '(Feature a ser implementada) Use o formulário na página "Sobre nós" ou envie um e-mail para suporte@spendo.com.br.',
        },
    ]

    return {
        questionsAndAnswers,
    }
}