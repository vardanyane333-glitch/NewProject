
'use client'

import { FC, useState } from 'react'
import style from './onlineGames.module.css'

interface Game {
  id: number
  title: string
  genre: string
  players: string
  rating: number
  image: string
  badge?: string
  description: string
  isLive?: boolean
}

const FEATURED_GAMES: Game[] = [
  {
    id: 1,
    title: 'Chrono Odyssey: Reborn',
    genre: 'MMORPG / Բաց աշխարհ',
    players: '142.8 հազ. առցանց',
    rating: 4.9,
    image:
      'https://placehold.co/600x400/1e1b4b/818cf8?text=Chrono+Odyssey',
    badge: 'Համաշխարհային պրեմիերա',
    description:
      'Մուտք գործիր բաց աշխարհ, որտեղ ժամանակը քո ամենահզոր զենքն է։ Մասնակցիր գիլդիաների լայնածավալ պաշարումներին և նվաճիր հաղթանակը։',
    isLive: true,
  },
  {
    id: 2,
    title: 'Apex Vanguard: Zero',
    genre: 'Մարտավարական հրաձիգ',
    players: '310.4 հազ. առցանց',
    rating: 4.8,
    image:
      'https://placehold.co/600x400/31101d/f43f5e?text=Apex+Vanguard',
    badge: 'Էլեկտրոնային սպորտի մրցաշար',
    description:
      'Ինտենսիվ 5-ը 5-ի դեմ մարտավարական մարտեր՝ շարժման առաջադեմ մեխանիզմներով և քանդվող միջավայրերով։',
    isLive: true,
  },
  {
    id: 3,
    title: 'Cyberpunk Drift 2142',
    genre: 'Մրցարշավ / Կիբերփանկ',
    players: '89.2 հազ. առցանց',
    rating: 4.7,
    image:
      'https://placehold.co/600x400/064e3b/34d399?text=Cyberpunk+Drift',
    badge: 'Նոր եթերաշրջան',
    description:
      'Անհատականացրու հակագրավիտացիոն մրցարշավային մեքենաներդ և նվաճիր Նեո Տոկիոյի նեոնային մայրուղիները։',
    isLive: true,
  },
  {
    id: 4,
    title: 'Soul Knight Arena',
    genre: 'Էքշն / MOBA',
    players: '215.1 հազ. առցանց',
    rating: 4.9,
    image:
      'https://placehold.co/600x400/451a03/fbbf24?text=Soul+Knight',
    badge: 'Թրենդային',
    description:
      'Արագընթաց մարտեր լեգենդար հերոսներով, կախարդական հարվածաշարերով և մրցակցային վարկանիշային համակարգով։',
    isLive: true,
  },
  {
    id: 5,
    title: 'Stellar Odyssey Survival',
    genre: 'Գոյատևում / Տիեզերք',
    players: '64.7 հազ. առցանց',
    rating: 4.6,
    image:
      'https://placehold.co/600x400/172554/60a5fa?text=Stellar+Odyssey',
    description:
      'Կառուցիր ուղեծրային կայաններ, հավաքիր ռեսուրսներ և պաշտպանիր քո նավատորմը այլմոլորակային սպառնալիքներից։',
    isLive: false,
  },
  {
    id: 6,
    title: 'Arcane Legends Online',
    genre: 'Ֆանտաստիկ RPG',
    players: '98.3 հազ. առցանց',
    rating: 4.8,
    image:
      'https://placehold.co/600x400/581c87/c084fc?text=Arcane+Legends',
    badge: 'Թարմացում 4.2',
    description:
      'Տիրապետիր հինավուրց մոգությանը, հաղթիր վիշապների զնդաններում և առևտուր արա խաղացողների շուկայում։',
    isLive: true,
  },
]

const CATEGORIES = [
  'Բոլորը',
  'MMORPG',
  'Մարտավարական հրաձիգ',
  'Մրցարշավ',
  'Էքշն',
  'Գոյատևում',
]

const OnlineGamesTY: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Բոլորը')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeGame, setActiveGame] = useState<Game | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const filteredGames = FEATURED_GAMES.filter((game) => {
    const matchesCategory =
      selectedCategory === 'Բոլորը' ||
      game.genre
        .toLowerCase()
        .includes(selectedCategory.toLowerCase())

    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const openGame = (game: Game, play = false) => {
    setActiveGame(game)
    setIsPlaying(play)
  }

  const closeModal = () => {
    setActiveGame(null)
    setIsPlaying(false)
  }

  return (
    <div className={style.git_bun}>
      <div className={style.dashboardContainer}>
        <section className={style.heroBanner}>
          <div className={style.heroBadge}>
            Մրցաշարն ուղիղ եթերում է
          </div>

          <h2 className={style.heroTitle}>
            CHRONO ODYSSEY. ԱՇԽԱՐՀԻ ՊԱՇԱՐՈՒՄԸ
          </h2>

          <p className={style.heroDescription}>
            Միացիր ավելի քան 140,000 ակտիվ խաղացողներին հենց հիմա։
            Մասնակցիր խմբակցությունների պատերազմներին և նվաճիր
            լեգենդար պարգևներ։
          </p>

          <div className={style.heroButtons}>
            <button
              onClick={() => openGame(FEATURED_GAMES[0], true)}
              className={style.primaryBtn}
            >
              🎮 Խաղալ հիմա
            </button>

            <button
              onClick={() => openGame(FEATURED_GAMES[0])}
              className={style.secondaryBtn}
            >
              Մանրամասներ
            </button>
          </div>
        </section>

        <div className={style.filterBarSection}>
          <div className={style.categoriesWrapper}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`${style.categoryChip} ${
                  selectedCategory === cat ? style.activeChip : ''
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={style.searchWrapper}>
            <span className={style.searchIcon}>🔍</span>

            <input
              type="text"
              placeholder="Որոնել խաղեր..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={style.searchInput}
              aria-label="Որոնել խաղեր"
            />
          </div>
        </div>

        <section className={style.gamesSection}>
          <div className={style.sectionHeader}>
            <h3 className={style.sectionTitle}>
              Առցանց բազմախաղացող խաղեր
            </h3>

            <span className={style.resultCount}>
              Գտնվել է՝ {filteredGames.length}{' '}
              {filteredGames.length === 1 ? 'խաղ' : 'խաղ'}
            </span>
          </div>

          <div className={style.gamesGrid}>
            {filteredGames.length === 0 ? (
              <div className={style.noResults}>
                <p className={style.noResultsTitle}>
                  Խաղեր չեն գտնվել
                </p>
                <p>
                  Փորձիր փոխել որոնման բառը կամ ընտրել այլ կատեգորիա։
                </p>
              </div>
            ) : (
              filteredGames.map((game) => (
                <div key={game.id} className={style.gameCard}>
                  <div className={style.cardImageContainer}>
                    <img
                      src={game.image}
                      alt={game.title}
                      className={style.cardImage}
                      loading="lazy"
                    />

                    {game.badge && (
                      <span className={style.cardBadge}>
                        {game.badge}
                      </span>
                    )}

                    {game.isLive && (
                      <span className={style.liveBadge}>
                        <span className={style.liveDot} />
                        ՈՒՂԻՂ
                      </span>
                    )}

                    <div className={style.cardOverlay}>
                      <button
                        onClick={() => openGame(game, true)}
                        className={style.playNowBtn}
                      >
                        ⚡ Միանալ հիմա
                      </button>
                    </div>
                  </div>

                  <div className={style.cardDetails}>
                    <div>
                      <div className={style.cardMetaTop}>
                        <span className={style.gameGenre}>
                          {game.genre}
                        </span>

                        <span className={style.gameRating}>
                          ★ {game.rating.toFixed(1)}
                        </span>
                      </div>

                      <h4
                        onClick={() => openGame(game)}
                        onKeyDown={(e) => {
                          if (
                            e.key === 'Enter' ||
                            e.key === ' '
                          ) {
                            e.preventDefault()
                            openGame(game)
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        className={style.gameTitle}
                      >
                        {game.title}
                      </h4>

                      <p className={style.gameDesc}>
                        {game.description}
                      </p>
                    </div>

                    <div className={style.cardMetaBottom}>
                      <div className={style.onlineInfo}>
                        <span
                          className={`${style.onlineIndicator} ${
                            !game.isLive
                              ? style.offlineIndicator
                              : ''
                          }`}
                        />
                        <span>{game.players}</span>
                      </div>

                      <button
                        onClick={() => openGame(game)}
                        className={style.detailsLink}
                      >
                        Մանրամասներ →
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {activeGame && (
          <div
            className={style.modalOverlay}
            onClick={closeModal}
          >
            <div
              className={style.modalContent}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="game-modal-title"
            >
              <button
                onClick={closeModal}
                className={style.closeModalBtn}
                aria-label="Փակել պատուհանը"
              >
                ✕
              </button>

              {isPlaying ? (
                <div className={style.launchingBox}>
                  <div className={style.launchIcon}>🚀</div>

                  <h3
                    id="game-modal-title"
                    className={style.launchTitle}
                  >
                    Գործարկվում է՝ {activeGame.title}
                  </h3>

                  <p className={style.launchDescription}>
                    Միացում ամպային խաղային սերվերին։
                    Ստեղծվում է քո խաղային սեսիան և
                    նախապատրաստվում է անհրաժեշտ սարքավորումը...
                  </p>

                  <div
                    className={style.progressBarContainer}
                    aria-label="Խաղային սեսիայի նախապատրաստում"
                  >
                    <div className={style.progressBarFill} />
                  </div>

                  <p className={style.launchNote}>
                    Քո խաղային սեսիան նախապատրաստվում է...
                  </p>

                  <button
                    onClick={closeModal}
                    className={style.secondaryBtn}
                  >
                    Չեղարկել սեսիան
                  </button>
                </div>
              ) : (
                <>
                  <div className={style.modalImageContainer}>
                    <img
                      src={activeGame.image}
                      alt={activeGame.title}
                      className={style.modalImage}
                    />

                    {activeGame.badge && (
                      <span className={style.cardBadge}>
                        {activeGame.badge}
                      </span>
                    )}
                  </div>

                  <div className={style.modalBody}>
                    <div className={style.modalHeaderRow}>
                      <div>
                        <span className={style.modalGenre}>
                          {activeGame.genre}
                        </span>

                        <h3
                          id="game-modal-title"
                          className={style.modalTitle}
                        >
                          {activeGame.title}
                        </h3>
                      </div>

                      <div className={style.modalStats}>
                        <div className={style.modalRating}>
                          ★ {activeGame.rating.toFixed(1)} / 5.0
                        </div>

                        <div className={style.modalPlayersCount}>
                          {activeGame.players}
                        </div>
                      </div>
                    </div>

                    <p className={style.modalDesc}>
                      {activeGame.description}
                    </p>

                    <div className={style.modalActions}>
                      <button
                        onClick={closeModal}
                        className={style.secondaryBtn}
                      >
                        Փակել
                      </button>

                      <button
                        onClick={() => setIsPlaying(true)}
                        className={style.primaryBtn}
                      >
                        🚀 Միանալ ամպային խաղին
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OnlineGamesTY
