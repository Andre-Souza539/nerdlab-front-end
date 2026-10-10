import { PostDetail } from '@/types/api';

export const MOCK_POSTS: PostDetail[] = [
  {
    id: '1',
    slug: 'arquitetura-hexagonal-spring-boot',
    title: 'Arquitetura Hexagonal no Spring Boot 3',
    summary: 'Aprenda a desacoplar seu domínio com facilidade aplicando Ports and Adapters.',
    excerpt: 'Descubra como isolar as regras de negócio de frameworks e bancos de dados usando Ports e Adapters no ecossistema moderno do Spring Boot 3 e Java 21.',
    category: 'Java',
    tags: ['Java', 'Spring Boot', 'Arquitetura', 'Clean Code'],
    readingTimeMinutes: 7,
    readTimeMinutes: 7,
    publishedAt: '2026-03-15T10:00:00Z',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Alexandre Souza',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: 'Staff Software Engineer'
    },
    tableOfContents: [
      { id: 'o-que-e-arquitetura-hexagonal', level: 2, title: 'O que é Arquitetura Hexagonal?' },
      { id: 'definicao-de-ports-e-adapters', level: 2, title: 'Definição de Ports e Adapters' },
      { id: 'implementacao-no-spring-boot-3', level: 2, title: 'Implementação no Spring Boot 3' },
      { id: 'vantagens-e-conclusao', level: 2, title: 'Vantagens e Conclusão' }
    ],
    content: `
A **Arquitetura Hexagonal** (também conhecida como padrão *Ports and Adapters*), proposta por Alistair Cockburn, é uma das abordagens mais sólidas para manter o código do domínio puro, testável e independente de tecnologias externas.

## O que é Arquitetura Hexagonal?

O objetivo principal da arquitetura é garantir que a aplicação possa ser igualmente acionada por usuários, outros programas ou testes automatizados, e desenvolvida e testada isoladamente de seus dispositivos e bancos de dados finais de execução.

No centro da aplicação reside a camada de **Domínio** e as **Regras de Negócio**, que não devem ter dependências de anotações JPA ou frameworks web.

## Definição de Ports e Adapters

- **Ports (Portas):** São interfaces Java puras definidas pelo domínio. Podem ser de *Entrada* (UseCases acionados pelos controllers) ou de *Saída* (Repository ports acionados pelo domínio).
- **Adapters (Adaptadores):** São as implementações concretas que conectam o mundo externo às portas. Exemplo: um controlador REST é um *Driving Adapter* (entrada); um repositório JPA ou cliente HTTP externo é um *Driven Adapter* (saída).

## Implementação no Spring Boot 3

Veja abaixo como estruturar uma porta de repositório e seu adaptador JPA no Spring Boot 3:

\`\`\`java
package com.nerdlab.domain.ports;

import com.nerdlab.domain.User;
import java.util.Optional;

// Porta do domínio puro: sem referências ao Spring ou Hibernate
public interface UserRepositoryPort {
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    User save(User user);
    boolean existsByEmail(String email);
}
\`\`\`

E a implementação do adaptador de persistência isolada na camada de infraestrutura:

\`\`\`java
package com.nerdlab.infrastructure.adapters.out.persistence;

import com.nerdlab.domain.User;
import com.nerdlab.domain.ports.UserRepositoryPort;
import org.springframework.stereotype.Component;

@Component
public class UserPersistenceAdapter implements UserRepositoryPort {

    private final JpaUserRepository jpaUserRepository;

    public UserPersistenceAdapter(JpaUserRepository jpaUserRepository) {
        this.jpaUserRepository = jpaUserRepository;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jpaUserRepository.findByEmail(email).map(UserEntity::toDomain);
    }

    @Override
    public User save(User user) {
        UserEntity entity = UserEntity.fromDomain(user);
        return jpaUserRepository.save(entity).toDomain();
    }
}
\`\`\`

## Vantagens e Conclusão

1. **Testabilidade Suprema:** Regras de negócio podem ser testadas com mocks leves de interfaces puras sem levantar o contexto completo do Spring Boot.
2. **Evolução Segura:** Trocar o banco relacional por um banco NoSQL exige apenas criar um novo adapter, sem alterar uma única linha do domínio.
3. **Manutenibilidade:** O código é limpo, autodescritivo e atende fielmente aos princípios de Clean Architecture e SOLID.
    `
  },
  {
    id: '2',
    slug: 'nextjs-16-turbopack-app-router',
    title: 'Next.js com Turbopack: Performance e App Router no Limite',
    summary: 'Como tirar o máximo proveito do Next.js, Server Components e compilação instantânea com Turbopack.',
    excerpt: 'Descubra como o Next.js com Turbopack e React Server Components redefinem a velocidade de carregamento e a experiência de desenvolvimento.',
    category: 'Frontend',
    tags: ['Frontend', 'Next.js', 'React', 'TypeScript'],
    readingTimeMinutes: 5,
    readTimeMinutes: 5,
    publishedAt: '2026-03-20T14:30:00Z',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'André Souza',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role: 'Fullstack Tech Lead'
    },
    tableOfContents: [
      { id: 'o-poder-do-turbopack', level: 2, title: 'O Poder do Turbopack' },
      { id: 'server-components-vs-client-components', level: 2, title: 'Server Components vs Client Components' },
      { id: 'streaming-e-suspense', level: 2, title: 'Streaming de UI com Suspense' }
    ],
    content: `
O Next.js consolidou a arquitetura do **App Router**, trazendo o modelo mental de **React Server Components (RSC)** para o padrão da indústria.

## O Poder do Turbopack

O Turbopack, escrito em Rust, foi projetado para substituir o Webpack. Ele traz inicialização de servidor local até 10x mais rápida e atualizações de Hot Module Replacement (HMR) quase imperceptíveis, mesmo em repositórios com milhares de componentes.

## Server Components vs Client Components

Por padrão, todos os arquivos criados dentro do diretório \`src/app/\` são Server Components. Isso significa que eles não enviam JavaScript adicional para o navegador do cliente, reduzindo o bundle inicial para frações do tamanho tradicional.

\`\`\`tsx
// Server Component nativo: busca dados diretamente sem useEffect ou loaders extras
import { postsService } from '@/services/postsService';
import { PostCard } from '@/components/articles/PostCard';

export default async function PostsPage() {
  const posts = await postsService.getPosts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.content.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
\`\`\`

## Streaming de UI com Suspense

Ao combinar Next.js App Router com \`React.Suspense\`, é possível enviar HTML progressivamente ao cliente através de streaming HTTP. O usuário visualiza imediatamente a estrutura da página acompanhada por skeletons animados enquanto o conteúdo mais pesado é resolvido em paralelo no servidor.
    `
  },
  {
    id: '3',
    slug: 'seguranca-jwt-spring-boot-3',
    title: 'Autenticação Stateless com JWT e Spring Security 6',
    summary: 'Implemente segurança de alta performance sem estado em APIs Spring Boot 3.',
    excerpt: 'Guia completo para configurar Spring Security 6 com tokens JWT HMAC-SHA256, BCrypt e proteção contra ataques comuns.',
    category: 'Segurança',
    tags: ['Java', 'Segurança', 'Spring Security', 'JWT'],
    readingTimeMinutes: 6,
    readTimeMinutes: 6,
    publishedAt: '2026-03-25T18:00:00Z',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Alexandre Souza',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: 'Staff Software Engineer'
    },
    tableOfContents: [
      { id: 'principios-stateless', level: 2, title: 'Princípios do Modelo Stateless' },
      { id: 'filtro-de-autenticacao-jwt', level: 2, title: 'Filtro de Autenticação JWT' },
      { id: 'configuracao-do-securityfilterchain', level: 2, title: 'Configuração do SecurityFilterChain' }
    ],
    content: `
Em arquiteturas de microsserviços e APIs modernas, gerenciar sessões HTTP tradicionais no servidor acarreta custos de escalabilidade e complexidade de replicação de memória.

## Princípios do Modelo Stateless

Ao adotar autenticação stateless via JSON Web Tokens (JWT):
- Cada requisição é auto-contida e transporta sua identidade no cabeçalho \`Authorization: Bearer <token>\`.
- O servidor assina o token com uma chave secreta simétrica (HS256/HS512) ou par de chaves assimétricas (RS256).
- Não há consulta obrigatória de sessão em memória RAM do servidor para cada chamada.

## Filtro de Autenticação JWT

O filtro personalizado estende \`OncePerRequestFilter\` para validar o token antes de despachar a requisição para os controladores:

\`\`\`java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7);
        String username = jwtService.extractUsername(jwt);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = 
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
\`\`\`

## Configuração do SecurityFilterChain

Com o Spring Security 6, a configuração utiliza o padrão funcional \`HttpSecurity\`, desabilitando sessões estaduais e configurando regras de CORS e endpoints públicos de forma declarativa.
    `
  },
  {
    id: '4',
    slug: 'devops-observabilidade-opentelemetry',
    title: 'Observabilidade Moderna: Logs, Métricas e Traces com OpenTelemetry',
    summary: 'Entenda como instrumentar seus serviços para visibilidade completa em ambientes de produção.',
    excerpt: 'Aprenda como unificar métricas, traces distribuídos e logs estruturados para monitoramento resiliente com OpenTelemetry e Grafana.',
    category: 'DevOps',
    tags: ['DevOps', 'Cloud', 'Docker', 'Observabilidade'],
    readingTimeMinutes: 8,
    readTimeMinutes: 8,
    publishedAt: '2026-03-28T09:15:00Z',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'André Souza',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role: 'Fullstack Tech Lead'
    },
    tableOfContents: [
      { id: 'os-tres-pilares', level: 2, title: 'Os Três Pilares da Observabilidade' },
      { id: 'opentelemetry-collector', level: 2, title: 'OpenTelemetry Collector' },
      { id: 'monitoramento-em-tempo-real', level: 2, title: 'Monitoramento em Tempo Real' }
    ],
    content: `
Monitorar aplicações distribuídas apenas com arquivos de log tradicionais é inviável quando dezenas de instâncias se comunicam simultaneamente.

## Os Três Pilares da Observabilidade

- **Métricas:** Dados agregados e contadores numéricos (ex: taxa de requisições por segundo, tempo médio de resposta, uso de CPU e memória heap da JVM).
- **Traces Distribuídos:** O caminho exato que uma requisição percorre por todos os serviços, identificando gargalos em milissegundos.
- **Logs Estruturados:** Registros no formato JSON contendo contexto como \`traceId\` e \`spanId\` para correlação direta.

## OpenTelemetry Collector

O OpenTelemetry é o padrão unificado da Cloud Native Computing Foundation (CNCF). Ele fornece bibliotecas agnósticas de fornecedor para coletar telemetria e exportar para plataformas como Jaeger, Prometheus, Grafana Tempo e Datadog.
    `
  }
];

export const MOCK_CATEGORIES = ['Java', 'Frontend', 'Segurança', 'DevOps', 'Cloud', 'Arquitetura'];
