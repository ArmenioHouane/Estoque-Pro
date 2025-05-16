import { LandingHeader } from "@/components/landing/landing-header"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function TermosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-accent to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Termos de <span className="text-primary">Serviço</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Última atualização: 15 de Maio de 2025
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="prose prose-blue dark:prose-invert max-w-3xl mx-auto">
              <p>
                Bem-vindo ao InventárioFácil. Estes Termos de Serviço (&quot;Termos&quot;) regem seu acesso e uso do site,
                serviços, aplicativos e ferramentas do InventárioFácil (coletivamente, os &quot;Serviços&quot;). Ao acessar ou
                usar nossos Serviços, você concorda com estes Termos. Se você não concordar com estes Termos, não acesse
                ou use nossos Serviços.
              </p>

              <h2>1. Uso dos Serviços</h2>
              <p>
                Você deve ter pelo menos 18 anos de idade para usar nossos Serviços. Ao usar nossos Serviços, você
                declara e garante que tem pelo menos 18 anos de idade e que tem o direito, autoridade e capacidade de
                concordar com estes Termos e cumpri-los.
              </p>
              <p>
                Você concorda em usar os Serviços apenas para fins legais e de acordo com estes Termos. Você é
                responsável por todas as atividades que ocorrem sob sua conta.
              </p>

              <h2>2. Contas e Segurança</h2>
              <p>
                Para acessar determinados recursos dos Serviços, você precisará criar uma conta. Você é responsável por
                manter a confidencialidade de suas credenciais de conta e por todas as atividades que ocorrem sob sua
                conta. Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta ou
                qualquer outra violação de segur sobre qualquer uso não autorizado de sua conta ou qualquer outra
                violação de segurança.
              </p>

              <h2>3. Assinaturas e Pagamentos</h2>
              <p>
                Alguns de nossos Serviços são oferecidos em base de assinatura. Ao assinar um plano pago, você concorda
                em pagar todas as taxas aplicáveis conforme descrito nos Serviços. A menos que especificado de outra
                forma:
              </p>
              <ul>
                <li>Todas as taxas são cotadas em Reais (R$)</li>
                <li>As taxas são cobradas antecipadamente em base mensal ou anual, dependendo do plano escolhido</li>
                <li>
                  As taxas não são reembolsáveis, exceto conforme exigido por lei ou conforme especificado nestes Termos
                </li>
              </ul>
              <p>
                Reservamo-nos o direito de alterar nossas taxas a qualquer momento, mediante aviso prévio de 30 dias. Se
                você não concordar com a alteração de preço, poderá cancelar sua assinatura antes que a alteração entre
                em vigor.
              </p>

              <h2>4. Conteúdo e Propriedade Intelectual</h2>
              <p>
                Nossos Serviços e todo o conteúdo, recursos e funcionalidades contidos neles são de nossa propriedade ou
                de nossos licenciadores e são protegidos por leis de direitos autorais, marcas registradas, patentes,
                segredos comerciais e outras leis de propriedade intelectual.
              </p>
              <p>
                Você não pode reproduzir, distribuir, modificar, criar trabalhos derivados, exibir publicamente,
                executar publicamente, republicar, baixar, armazenar ou transmitir qualquer material de nossos Serviços,
                exceto conforme permitido por estes Termos.
              </p>

              <h2>5. Conteúdo do Usuário</h2>
              <p>
                Nossos Serviços podem permitir que você carregue, envie, armazene, compartilhe ou forneça certas
                informações, textos, gráficos, vídeos ou outros materiais (&quot;Conteúdo do Usuário&quot;). Você mantém todos os
                direitos sobre seu Conteúdo do Usuário.
              </p>
              <p>
                Ao fornecer Conteúdo do Usuário através de nossos Serviços, você nos concede uma licença mundial, não
                exclusiva, isenta de royalties, sublicenciável e transferível para usar, reproduzir, modificar, adaptar,
                publicar, traduzir, criar trabalhos derivados, distribuir e exibir tal Conteúdo do Usuário em conexão
                com a operação e fornecimento dos Serviços.
              </p>

              <h2>6. Privacidade</h2>
              <p>
                Nosso uso de suas informações pessoais é regido por nossa Política de Privacidade, que está incorporada
                a estes Termos por referência. Ao usar nossos Serviços, você concorda com a coleta, uso e
                compartilhamento de suas informações conforme estabelecido em nossa Política de Privacidade.
              </p>

              <h2>7. Limitação de Responsabilidade</h2>
              <p>
                Em nenhuma circunstância seremos responsáveis por quaisquer danos indiretos, incidentais, especiais,
                punitivos, consequenciais ou exemplares, incluindo, mas não se limitando a, danos por perda de lucros,
                fundo de comércio, uso, dados ou outras perdas intangíveis, resultantes de ou relacionadas ao uso ou
                incapacidade de usar os Serviços.
              </p>
              <p>
                Nossa responsabilidade total a você por quaisquer danos não excederá o valor pago por você, se houver,
                pelos Serviços durante os seis (6) meses imediatamente anteriores à data da reclamação.
              </p>

              <h2>8. Indenização</h2>
              <p>
                Você concorda em defender, indenizar e isentar de responsabilidade o InventárioFácil e seus diretores,
                funcionários, agentes, sucessores e cessionários de e contra quaisquer reclamações, responsabilidades,
                danos, julgamentos, prêmios, perdas, custos, despesas ou taxas (incluindo honorários advocatícios
                razoáveis) decorrentes de ou relacionados à sua violação destes Termos ou seu uso dos Serviços.
              </p>

              <h2>9. Rescisão</h2>
              <p>
                Podemos encerrar ou suspender seu acesso aos Serviços imediatamente, sem aviso prévio ou
                responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar estes Termos. Após a
                rescisão, seu direito de usar os Serviços cessará imediatamente.
              </p>

              <h2>10. Alterações nos Termos</h2>
              <p>
                Reservamo-nos o direito, a nosso critério exclusivo, de modificar ou substituir estes Termos a qualquer
                momento. Se uma revisão for material, forneceremos pelo menos 30 dias de aviso antes que quaisquer novos
                termos entrem em vigor. O que constitui uma alteração material será determinado a nosso critério
                exclusivo.
              </p>

              <h2>11. Lei Aplicável</h2>
              <p>
                Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas
                disposições sobre conflitos de leis.
              </p>

              <h2>12. Contato</h2>
              <p>
                Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco pelo e-mail
                juridico@inventariofacil.com.br.
              </p>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  )
}
