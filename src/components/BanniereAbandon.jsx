/**
 * Bandeau d'abandon du projet.
 *
 * Exception assumée au système de thèmes : les couleurs sont figées en dur au
 * lieu de passer par les variables CSS. Un avertissement doit rester
 * franchement rouge dans les cinq palettes — y compris « crypte », dont la
 * braise tire sur le bleu, et les deux thèmes clairs.
 */
export default function BanniereAbandon() {
  return (
    <div
      role="alert"
      className="relative z-50 border-b border-[#b91c1c] bg-gradient-to-r from-[#5f1010] via-[#8f1d1d] to-[#5f1010] text-[#fee2e2] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-1.5 px-5 py-3 text-center sm:flex-row sm:gap-4 sm:text-left">
        {/* Le d20 fatidique : il est retombé sur 1, et le projet avec lui */}
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#fca5a5]/60 bg-[#450a0a]/70 font-rune text-sm text-[#fecaca] animate-respiration"
        >
          1
        </span>

        <p className="font-display text-[0.65rem] uppercase tracking-[0.22em] text-[#fecaca] sm:text-xs sm:tracking-[0.28em]">
          Projet abandonné
        </p>

        <p className="font-grimoire text-sm leading-snug text-[#fee2e2]/90">
          Solasta nous a mis une <strong className="font-semibold">branlée</strong> et nous a
          rappelé notre condition de mortels. Le grimoire reste ouvert, mais plus personne ne
          l'écrit&nbsp;: ces builds sont désormais des reliques. Jet de sauvegarde raté, jeu de
          merde, on part élever des chèvres.
        </p>
      </div>
    </div>
  )
}
