import { LandingHeader } from "@/components/landing/landing-header"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function PrivacidadePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-accent to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Política de <span className="text-primary">Privacidade</span>
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
                A InventárioFácil (&quot;nós&quot;, &quot;nosso&quot; ou &quot;empresa&quot;) está comprometida em proteger sua privacidade. Esta
                Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações
                pessoais quando você usa nosso site, aplicativos e serviços (coletivamente, os &quot;Serviços&quot;).
              </p>
              <p>
                Ao usar nossos Serviços, você concorda com a coleta, uso e divulgação de informações de acordo com esta
                Política de Privacidade. Se você não concordar com esta Política de Privacidade, não use nossos
                Serviços.
              </p>

              <h2>1. Informações que Coletamos</h2>
              <p>Podemos coletar os seguintes tipos de informações:</p>

              <h3>1.1 Informações Pessoais</h3>
              <p>
                Informações que você nos fornece diretamente, como nome, endereço de e-mail, número de telefone,
                endereço postal, informações de pagamento e quaisquer outras informações que você optar por fornecer.
              </p>

              <h3>1.2 Informações de Uso</h3>
              <p>
                Informações sobre como você usa nossos Serviços, incluindo dados de acesso, páginas visualizadas,
                cliques, ações, horários de acesso, dispositivo usado e outras estatísticas.
              </p>

              <h3>1.3 Informações do Dispositivo</h3>
              <p>
                Informações sobre o dispositivo que você usa para acessar nossos Serviços, incluindo modelo de hardware,
                sistema operacional, identificadores únicos de dispositivo e informações de rede móvel.
              </p>

              <h3>1.4 Informações de Localização</h3>
              <p>
                Com sua permissão, podemos coletar e processar informações sobre sua localização precisa ou aproximada.
              </p>

              <h3>1.5 Cookies e Tecnologias Semelhantes</h3>
              <p>
                Usamos cookies e tecnologias semelhantes para coletar informações sobre como você interage com nossos
                Serviços. Para mais informações, consulte nossa Política de Cookies.
              </p>

              <h2>2. Como Usamos Suas Informações</h2>
              <p>Usamos as informações que coletamos para:</p>
              <ul>
                <li>Fornecer, manter e melhorar nossos Serviços</li>
                <li>Processar transações e enviar notificações relacionadas</li>
                <li>Enviar comunicações técnicas, atualizações, alertas de segurança e mensagens de suporte</li>
                <li>Responder a seus comentários, perguntas e solicitações</li>
                <li>Entender como você usa nossos Serviços para melhorá-los</li>
                <li>Personalizar sua experiência e fornecer conteúdo e recursos relevantes</li>
                <li>Monitorar e analisar tendências, uso e atividades relacionadas aos nossos Serviços</li>
                <li>Detectar, prevenir e resolver problemas técnicos, fraudes e atividades ilegais</li>
                <li>Cumprir obrigações legais</li>
              </ul>

              <h2>3. Compartilhamento de Informações</h2>
              <p>Podemos compartilhar suas informações nas seguintes circunstâncias:</p>

              <h3>3.1 Com Prestadores de Serviços</h3>
              <p>
                Compartilhamos informações com prestadores de serviços terceirizados que precisam acessar as informações
                para realizar serviços em nosso nome, como processamento de pagamentos, análise de dados, entrega de
                e-mails, hospedagem de serviços e atendimento ao cliente.
              </p>

              <h3>3.2 Para Conformidade Legal</h3>
              <p>
                Podemos divulgar suas informações se acreditarmos de boa-fé que tal divulgação é necessária para cumprir
                a lei, regulamentos, processos legais ou solicitações governamentais.
              </p>

              <h3>3.3 Em Caso de Transferência de Negócios</h3>
              <p>
                Se estivermos envolvidos em uma fusão, aquisição, venda de ativos ou falência, suas informações podem
                ser transferidas como parte desse processo. Notificaremos você sobre qualquer mudança na propriedade ou
                uso de suas informações pessoais.
              </p>

              <h3>3.4 Com Seu Consentimento</h3>
              <p>Podemos compartilhar suas informações com terceiros quando você nos der consentimento para fazê-lo.</p>

              <h2>4. Segurança de Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas, administrativas e físicas projetadas para proteger suas
                informações contra acesso não autorizado, perda, uso indevido ou alteração. No entanto, nenhum método de
                transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro, e não podemos garantir
                sua segurança absoluta.
              </p>

              <h2>5. Seus Direitos e Escolhas</h2>
              <p>Dependendo da sua localização, você pode ter os seguintes direitos:</p>
              <ul>
                <li>Acessar, corrigir ou excluir suas informações pessoais</li>
                <li>Restringir ou opor-se ao processamento de suas informações pessoais</li>
                <li>Receber suas informações pessoais em um formato estruturado e padrão</li>
                <li>Retirar seu consentimento a qualquer momento</li>
                <li>Apresentar uma reclamação a uma autoridade de proteção de dados</li>
              </ul>
              <p>
                Para exercer esses direitos, entre em contato conosco usando as informações fornecidas na seção
                &quot;Contato&quot; abaixo.
              </p>

              <h2>6. Retenção de Dados</h2>
              <p>
                Retemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos nesta
                Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por
                lei.
              </p>

              <h2>7. Transferências Internacionais de Dados</h2>
              <p>
                Suas informações podem ser transferidas e processadas em países diferentes daquele em que você reside.
                Esses países podem ter leis de proteção de dados diferentes das leis do seu país. Tomamos medidas para
                garantir que suas informações recebam um nível adequado de proteção em qualquer país onde sejam
                processadas.
              </p>

              <h2>8. Crianças</h2>
              <p>
                Nossos Serviços não são direcionados a crianças menores de 13 anos, e não coletamos intencionalmente
                informações pessoais de crianças menores de 13 anos. Se soubermos que coletamos informações pessoais de
                uma criança menor de 13 anos, tomaremos medidas para excluir essas informações o mais rápido possível.
              </p>

              <h2>9. Alterações nesta Política de Privacidade</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. A versão atualizada será indicada por uma
                data de &quot;Última atualização&quot; revisada e a versão atualizada entrará em vigor assim que for acessível. Se
                fizermos alterações materiais a esta Política de Privacidade, notificaremos você publicando um aviso
                proeminente em nossos Serviços ou enviando uma notificação diretamente a você.
              </p>

              <h2>10. Contato</h2>
              <p>
                Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou nossas práticas de
                privacidade, entre em contato conosco em:
              </p>
              <p>
                InventárioFácil
                <br />
                Av. Paulista, 1000, Bela Vista
                <br />
                São Paulo - SP, 01310-100
                <br />
                Brasil
                <br />
                E-mail: privacidade@inventariofacil.com.br
                <br />
                Telefone: +55 (11) 3456-7890
              </p>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  )
}
