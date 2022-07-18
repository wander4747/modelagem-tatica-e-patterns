# Domain Driven Design

“Domain-driven design is not a technology nor methodology.” ~ Eric Evans

## Livros

Domain-Driven Design: Atacando as complexidades no coração do software - Eric Evans | Implementando Domain-Driven Design - Vaughn Vernon
:-------------------------:|:-------------------------:
![](https://dddcommunity.org/wp-content/uploads/files/images/cover_medium.jpg) | ![](https://dddcommunity.org/wp-content/uploads/2013/02/implementing-domain-driven-design-400x400-imae6dr5trk3uycd.jpeg)

O design orientado ao domínio, também conhecido como DDD (Domain Driven
Design) é uma abordagem que trabalha com práticas de design e desenvolvimento, oferecendo ferramentas de modelagem tática e estratégica para entregar
um software de alta qualidade, acelerando o seu desenvolvimento e garantindo
sua sustentabilidade.


### Entidade

Uma Entidade é um objeto com suas próprias propriedades (estado, dados) e métodos que implementam a lógica de negócios que é executada nessas propriedades. Uma entidade é representada por seu identificador único (Id). Exemplo de entidades: Usuário, Cliente, Organização..etc

### Value Object

É outro tipo de objeto de domínio que é identificado por suas propriedades em vez de um ID exclusivo. Exemplo de objetos de valor: Nome, Endereço, JobTitle..etc. Uma implementação correta de uma entidade de usuário e um objeto de valor de nome seria que a identificação exclusiva do usuário fosse feita por um UUID e não pela string de nome

### Agregados

Um Agregado é um cluster de objetos (entidades e objetos de valor) unidos por um objeto Raiz Agregado. A Raiz Agregada é um tipo específico de entidade com algumas responsabilidades adicionais para manter a consistência das alterações em objetos em um modelo com associações complexas.


### Domain-Service

Quando temos um comportamento não atrelado a uma Entity ou Value Object, podemos representá-lo como um Domain Service.

Domain Service tem as seguintes características:

- Não mantêm estado
- Não tem rastreabilidade
- Podem receber Entities e Value Objects como parâmetro
- Podem ter dependências de interfaces para serviços externos
- Executam alguma regra de negócio.

### Repositories

Um Repositório é uma interface semelhante a uma coleção que é usada pelas Camadas de Domínio e de Aplicação para acessar o sistema de persistência de dados.

`Todo tipo de Agregado persistente terá um Repositório. De um modo geral, existe uma relação de um-para-um entre um tipo de Agregado e um Repositório.`

“Implementing Domain-Driven Design - Vaughn Vernon”


### Domain Events

Eventos de domínio são abstrações poderosas para facilitar a comunicação entre contextos delimitados e, eventualmente, como alternativa para persistência.


`Use um evento de domínio para capturar uma ocorrência de algo que aconteceu no domínio.`

“Implementing Domain-Driven Design - Vaughn Vernon”


### Modules

Um Módulo serve como um contêiner para um conjunto específico de classes de sua aplicação. Em PHP, este seria um namespace específico que contém todas as classes relacionadas a esse conceito específico.

O código dentro de um módulo deve ser altamente coeso e deve haver baixo acoplamento entre classes de módulos diferentes.



Fonte: https://faun.pub/demystifying-domain-driven-design-b7987c9ed09a