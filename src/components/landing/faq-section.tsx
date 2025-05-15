import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-accent">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">FAQ</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Perguntas Frequentes</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Respostas para as dúvidas mais comuns sobre o Estoque Pro.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl py-12">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Quanto tempo leva para implementar o sistema?</AccordionTrigger>
              <AccordionContent>
                A implementação básica do Estoque Pro pode ser feita em apenas um dia. Para empresas com grandes
                volumes de dados ou necessidades específicas, o processo completo pode levar até uma semana, incluindo
                importação de dados, configurações personalizadas e treinamento da equipe.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Posso importar meus dados de outro sistema?</AccordionTrigger>
              <AccordionContent>
                Sim! O Estoque Pro permite importar dados de planilhas Excel, CSV e de vários outros sistemas de
                gestão. Nossa equipe de suporte pode ajudar no processo de migração para garantir que todos os seus
                dados sejam transferidos corretamente.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>O sistema funciona em dispositivos móveis?</AccordionTrigger>
              <AccordionContent>
                Absolutamente. O Estoque Pro é totalmente responsivo e funciona em qualquer dispositivo com acesso à
                internet. Além disso, oferecemos aplicativos nativos para iOS e Android que permitem gerenciar seu
                inventário mesmo offline, com sincronização automática quando a conexão for restabelecida.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Vocês oferecem suporte técnico?</AccordionTrigger>
              <AccordionContent>
                Sim, todos os planos incluem suporte técnico. O plano Básico oferece suporte por e-mail com tempo de
                resposta de até 24 horas. O plano Profissional inclui suporte prioritário por e-mail e chat com tempo de
                resposta de até 4 horas. Já o plano Empresarial oferece suporte 24/7 por e-mail, chat e telefone.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Posso testar o sistema antes de assinar?</AccordionTrigger>
              <AccordionContent>
                Claro! Oferecemos um período de teste gratuito de 14 dias com todas as funcionalidades do plano
                Profissional. Não é necessário cartão de crédito para começar o teste. Além disso, oferecemos
                demonstrações guiadas com nossa equipe para mostrar como o sistema pode atender às necessidades
                específicas da sua empresa.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>O sistema pode ser integrado com outras ferramentas?</AccordionTrigger>
              <AccordionContent>
                Sim, o Estoque Pro oferece integrações nativas com diversos sistemas populares de e-commerce,
                contabilidade e ERP. Além disso, disponibilizamos uma API completa nos planos Profissional e
                Empresarial, permitindo desenvolver integrações personalizadas com qualquer sistema.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
