---
layout: post
title: "Evite usar if/else"
author: "Rafael Martins"
---

Este é meu primeiro post no blog e para estrear escolhi falar de uma dica simples que costumo utilizar nos códigos que escrevo. O exemplo será em PHP mas serve para qualquer linguagem.

Quando comecei a trabalhar em uma empresa que utilizava o processo de *code review*, uma
das primeiras dicas que recebi era que o time dev não aceitava o *pull request* se existisse *if/else* no código.
O principal motivo para essa regra é que quase sempre não é necessário escrever dessa forma e consequentemente o código fica mais claro de ler e interpretar.

#### Exemplo 01:
```
<?php
    if (false) {
        # code...
    } else {
        # another code...
    }
?>
```

Imagine tentar ler e compreender um código similar ao exemplo acima que tem a estrutura if/else onde cada bloco tivesse mais de 10 linhas.

Certamente, mesmo que você fosse o autor original, levaria um bom tempo esse processo.

A sugestão ao evitar o uso do *else* é deixar o que existe em comum entre os dois blocos fora do *if*, e então, 
somente a exceção em uma condicional.

#### Refatoração exemplo 01
```
<?php
    # code...
    
    if (false) {
        # another code...
    }
?>
```

A vantagem de escrever dessa forma é a redução de linhas de código e redundância na lógica aplicada. 
Ao longo do tempo a leitura de códigos extensos se torna mais fácil de compreender.

#### Exemplo nota de um aluno

Maior que 7 = Aprovado /
Entre 5 e 7 = Recuperação /
Menor que 5 = Reprovado

```
<?php

if ($nota < 5) {
    # code... $nota < 5
    return
}

if ($nota > 7) {
    # code... $nota > 7
    return
}

# code... $nota entre 5 e 7

?>
```

Neste exemplo a ideia é ter os extremos (maior que 7 e menor que 5) em condicionais e sair do processamento logo. 
O código fica com a identação simples e no teste unitário o nível de complexidade seria considerado baixo.

Deixe seu comentário para ajudar a melhorar esse post e o blog!

