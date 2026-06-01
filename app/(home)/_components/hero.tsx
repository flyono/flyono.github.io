export function Hero() {
  return (
    <section className="flex flex-col items-center text-center animate-scale-in">
      <Avatar />
      <Intro />
    </section>
  );
}

function Avatar() {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-amber-500/10 dark:bg-amber-400/5 rounded-full blur-2xl scale-150" />
      <img
        src="/Black cat.png"
        alt="Flyone"
        width={96}
        height={96}
        className="relative w-24 h-24 rounded-full ring-2 ring-stone-200/60 dark:ring-stone-800/60 ring-offset-4 ring-offset-stone-50 dark:ring-offset-stone-950"
      />
    </div>
  );
}

function Intro() {
  return (
    <div className="space-y-3">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
        Hey, 欢迎来到 Flyono 的个人基地！
      </h1>
      <p className="text-stone-500 dark:text-stone-400 text-base leading-relaxed max-w-xs mx-auto">
        游戏开发者 &amp; 开源爱好者。捣鼓点小工具，写写踩坑笔记。
      </p>
    </div>
  );
}
