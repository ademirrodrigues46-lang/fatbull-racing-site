const steps = [
  ['Baixe e instale', 'Use o instalador Windows x64 da versão publicada. Conclua a instalação e abra FATBULL Overlay pelo menu Iniciar.'],
  ['Monte seu layout', 'Abra o painel com Ctrl + Shift + J. Escolha os widgets e ajuste tamanho e fundo. A prévia do painel usa dados simulados.'],
  ['Distribua nas telas', 'Use o modo Estender do Windows. Com Ctrl + Shift + M, mova os widgets destravados entre os monitores. Pressione novamente para encerrar a edição.'],
  ['Entre na pista', 'Use o iRacing em janela ou janela sem bordas. Entre no carro para ver o overlay. Ctrl + Shift + H alterna a visibilidade manual.'],
];
export function Installation() {
  return <section className="section shell" id="instalacao"><div className="section-heading"><div><p className="eyebrow">04 / PRONTO PARA A PRÓXIMA SESSÃO</p><h2>Do download<br /><span>ao cockpit.</span></h2></div><p>O instalador inclui os componentes do aplicativo. Para usar, você não precisa instalar Python ou Node.js separadamente.</p></div><ol className="steps">{steps.map(([title, text], i) => <li key={title}><span className="step-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol><div className="faq"><h3>Antes de apagar as luzes.</h3><div>
    <details><summary>Os overlays não aparecem. O que verificar?</summary><p>Confirme o modo janela ou janela sem bordas do iRacing e entre no carro. Use Ctrl + Shift + H se a visibilidade foi desligada manualmente. Feche a ponte de uma versão antiga antes de abrir o aplicativo atual.</p></details>
    <details><summary>Como atualizar o aplicativo?</summary><p>Abra Ctrl + Shift + J → Atualizações → Verificar atualização. Quando houver uma nova versão, baixe pelo painel e use Reiniciar e atualizar após a corrida. Você também pode baixar o instalador nesta página.</p></details>
    <details><summary>Posso usar em uma transmissão?</summary><p>Com o aplicativo aberto, adicione uma fonte Navegador ao OBS usando <code>http://localhost:8765/overlay.html</code>. Ajuste a resolução da fonte ao seu layout. A distribuição no OBS é independente das janelas da área de trabalho.</p></details>
    <details><summary>Por que o Windows pode exibir um aviso?</summary><p>A edição documentada do aplicativo é distribuída sem assinatura digital de editor. Confira a origem do arquivo na release oficial antes de decidir instalá-lo. Consulte as notas da versão para informações atualizadas.</p></details>
  </div></div></section>;
}

