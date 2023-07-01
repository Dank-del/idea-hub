import IdeaGrid from "@/components/idea-grid";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Hub for all ideas creative <br className="hidden sm:inline" />
          to bring a better future to mankind
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Share Ideas, Innovate, collaborate, all in one platform.
        </p>
      </div>
      <IdeaGrid/>
    </section>
  )
}
