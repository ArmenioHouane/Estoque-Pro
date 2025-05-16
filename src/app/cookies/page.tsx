import { LandingHeader } from "@/components/landing/landing-header"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function CookiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-accent to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Política de <span className="text-primary">Cookies</span>
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
                Esta Política de Cookies explica como a InventárioFácil (&quot;nós&quot;, &quot;nosso&quot; ou &quot;empresa&quot;) usa cookies e
                tecnologias similares para reconhecê-lo quando você visita nosso site e usa nossos serviços
                (coletivamente, os &quot;Serviços&quot;). Ela explica o que são essas tecnologias e por que as usamos, bem como
                seus direitos de controlar nosso uso delas.
              </p>

              <h2>1. O que são Cookies?</h2>
              <p>
                Cookies são pequenos arquivos de dados que são colocados no seu computador ou dispositivo móvel quando
                você visita um site. Os cookies são amplamente utilizados pelos proprietários de sites para fazer seus
                sites funcionarem, ou funcionarem de maneira mais eficiente, bem como para fornecer informações de
                relatórios.
              </p>
              <p>
                Os cookies definidos pelo proprietário do site (neste caso, InventárioFácil) são chamados de cookies
                &quot;primários&quot;. Os cookies definidos por partes que não o proprietário do site são chamados de cookies &quot;de
                terceiros&quot;. Os cookies de terceiros permitem que recursos ou funcionalidades de terceiros sejam
                fornecidos no ou através do site (como publicidade, conteúdo interativo e análises).
              </p>

              <h2>2. Por que usamos Cookies?</h2>
              <p>Usamos cookies primários e de terceiros pelos seguintes motivos:</p>

              <h3>2.1 Cookies Necessários</h3>
              <p>
                Esses cookies são essenciais para fornecer a você os serviços disponíveis em nosso site e para permitir
                que você use alguns de seus recursos. Sem esses cookies, não podemos fornecer certos serviços em nosso
                site. Esses cookies não coletam nenhuma informação sobre você que possa ser usada para publicidade ou
                para lembrar onde você esteve na internet.
              </p>

              <h3>2.2 Cookies de Desempenho e Funcionalidade</h3>
              <p>
                Esses cookies são usados para melhorar o desempenho e a funcionalidade de nossos Serviços, mas não são
                essenciais para seu uso. No entanto, sem esses cookies, certas funcionalidades podem se tornar
                indisponíveis.
              </p>

              <h3>2.3 Cookies Analíticos e de Personalização</h3>
              <p>
                Esses cookies coletam informações que são usadas para nos ajudar a entender como nossos Serviços são
                usados ou quão eficazes são nossas campanhas de marketing, ou para nos ajudar a personalizar nossos
                Serviços para você. Esses cookies nos permitem:
              </p>
              <ul>
                <li>Entender e melhorar a forma como nossos Serviços funcionam</li>
                <li>Contar o número de visitantes e ver como os visitantes se movem pelo nosso site</li>
                <li>Lembrar de suas preferências e configurações</li>
                <li>Personalizar sua experiência com base em suas visitas anteriores</li>
              </ul>

              <h3>2.4 Cookies de Marketing</h3>
              <p>
                Esses cookies são usados para rastrear visitantes em sites. A intenção é exibir anúncios que sejam
                relevantes e envolventes para o usuário individual e, portanto, mais valiosos para editores e
                anunciantes terceirizados.
              </p>

              <h2>3. Cookies que Usamos</h2>
              <p>Abaixo está uma lista detalhada dos cookies que usamos em nossos Serviços:</p>

              <table>
                <thead>
                  <tr>
                    <th>Nome do Cookie</th>
                    <th>Tipo</th>
                    <th>Finalidade</th>
                    <th>Duração</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>session_id</td>
                    <td>Necessário</td>
                    <td>Usado para manter sua sessão ativa enquanto você usa nossos Serviços</td>
                    <td>Sessão</td>
                  </tr>
                  <tr>
                    <td>auth_token</td>
                    <td>Necessário</td>
                    <td>Usado para autenticar usuários e manter o login</td>
                    <td>30 dias</td>
                  </tr>
                  <tr>
                    <td>preferences</td>
                    <td>Funcionalidade</td>
                    <td>Armazena suas preferências de usuário, como tema e configurações de idioma</td>
                    <td>1 ano</td>
                  </tr>
                  <tr>
                    <td>_ga</td>
                    <td>Analítico</td>
                    <td>Usado pelo Google Analytics para distinguir usuários</td>
                    <td>2 anos</td>
                  </tr>
                  <tr>
                    <td>_gid</td>
                    <td>Analítico</td>
                    <td>Usado pelo Google Analytics para distinguir usuários</td>
                    <td>24 horas</td>
                  </tr>
                  <tr>
                    <td>_fbp</td>
                    <td>Marketing</td>
                    <td>Usado pelo Facebook para entregar uma série de produtos publicitários</td>
                    <td>3 meses</td>
                  </tr>
                </tbody>
              </table>

              <h2>4. Outras Tecnologias de Rastreamento</h2>
              <p>
                Além dos cookies, também podemos usar web beacons, pixel tags e outras tecnologias de rastreamento em
                nossos Serviços para nos ajudar a personalizar nossos Serviços e melhorar sua experiência.
              </p>
              <p>
                Um web beacon (também conhecido como &quot;pixel de rastreamento&quot; ou &quot;clear GIF&quot;) é uma imagem gráfica
                transparente que é colocada em um site ou em um e-mail e é usada para monitorar a atividade do usuário.
                Ao contrário dos cookies, que são armazenados no computador do usuário, os web beacons são invisíveis
                para o usuário.
              </p>

              <h2>5. Como Controlar Cookies</h2>
              <p>
                Você tem o direito de decidir se aceita ou rejeita cookies. Você pode exercer suas preferências de
                cookies clicando no botão &quot;Configurações de Cookies&quot; no banner de cookies que aparece quando você acessa
                nosso site pela primeira vez.
              </p>
              <p>
                Você também pode configurar seu navegador para recusar todos os cookies ou para indicar quando um cookie
                está sendo enviado. No entanto, se você não aceitar cookies, poderá não conseguir usar algumas partes de
                nossos Serviços.
              </p>
              <p>Os métodos mais comuns para fazer isso são:</p>
              <ul>
                <li>
                  <strong>Google Chrome:</strong> Menu &gt; Configurações &gt; Avançado &gt; Privacidade e segurança
                  &gt; Configurações de conteúdo &gt; Cookies
                </li>
                <li>
                  <strong>Mozilla Firefox:</strong> Menu &gt; Opções &gt; Privacidade e Segurança &gt; Cookies e dados
                  do site
                </li>
                <li>
                  <strong>Safari:</strong> Preferências &gt; Privacidade &gt; Cookies e dados do site
                </li>
                <li>
                  <strong>Microsoft Edge:</strong> Menu &gt; Configurações &gt; Cookies e permissões do site &gt;
                  Cookies
                </li>
              </ul>

              <h2>6. Alterações nesta Política de Cookies</h2>
              <p>
                Podemos atualizar esta Política de Cookies de tempos em tempos para refletir, por exemplo, mudanças nos
                cookies que usamos ou por outros motivos operacionais, legais ou regulatórios. Portanto, visite esta
                Política de Cookies regularmente para se manter informado sobre nosso uso de cookies e tecnologias
                relacionadas.
              </p>
              <p>A data no topo desta Política de Cookies indica quando ela foi atualizada pela última vez.</p>

              <h2>7. Contato</h2>
              <p>
                Se você tiver alguma dúvida sobre nosso uso de cookies ou outras tecnologias, entre em contato conosco
                em:
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
