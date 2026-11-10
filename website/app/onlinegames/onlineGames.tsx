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
    genre: 'MMORPG / Open World',
    players: '142.8K online',
    rating: 4.9,
    image:
      'https://placehold.co/600x400/1e1b4b/818cf8?text=Chrono+Odyssey',
    badge: 'World Premiere',
    description:
      'Enter an open world where time is your ultimate weapon. Take part in massive guild sieges.',
    isLive: true,
  },
  {
    id: 2,
    title: 'Apex Vanguard: Zero',
    genre: 'Tactical Shooter',
    players: '310.4K online',
    rating: 4.8,
    image:
      'https://placehold.co/600x400/31101d/f43f5e?text=Apex+Vanguard',
    badge: 'Esports Major',
    description:
      'High-intensity 5v5 tactical combat featuring advanced movement mechanics and destructible environments.',
    isLive: true,
  },
  {
    id: 3,
    title: 'Cyberpunk Drift 2142',
    genre: 'Racing / Cyberpunk',
    players: '89.2K online',
    rating: 4.7,
    image:
      'https://placehold.co/600x400/064e3b/34d399?text=Cyberpunk+Drift',
    badge: 'New Season',
    description:
      'Customize anti-gravity racing cars and conquer the neon highways of Neo Tokyo.',
    isLive: true,
  },
  {
    id: 4,
    title: 'Soul Knight Arena',
    genre: 'Action / MOBA',
    players: '215.1K online',
    rating: 4.9,
    image:
      'https://placehold.co/600x400/451a03/fbbf24?text=Soul+Knight',
    badge: 'Trending',
    description:
      'Fast-paced battles with legendary heroes, magical combos, and competitive rankings.',
    isLive: true,
  },
  {
    id: 5,
    title: 'Stellar Odyssey Survival',
    genre: 'Survival / Space',
    players: '64.7K online',
    rating: 4.6,
    image:
      'https://placehold.co/600x400/172554/60a5fa?text=Stellar+Odyssey',
    description:
      'Build orbital stations, gather resources, and defend your fleet against alien threats.',
    isLive: false,
  },
  {
    id: 6,
    title: 'Arcane Legends Online',
    genre: 'Fantasy RPG',
    players: '98.3K online',
    rating: 4.8,
    image:
      'https://placehold.co/600x400/581c87/c084fc?text=Arcane+Legends',
    badge: 'Update 4.2',
    description:
      'Master ancient magic, conquer dragon dungeons, and trade items in the player marketplace.',
    isLive: true,
  },
]

const CATEGORIES = [
  'All',
  'MMORPG',
  'Tactical Shooter',
  'Racing',
  'Action',
  'Survival',
]

const OnlineGamesTY: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeGame, setActiveGame] = useState<Game | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const filteredGames = FEATURED_GAMES.filter((game) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      game.genre.toLowerCase().includes(selectedCategory.toLowerCase())

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
            Featured Tournament LIVE
          </div>

          <h2 className={style.heroTitle}>
            CHRONO ODYSSEY: WORLD SIEGE
          </h2>

          <p className={style.heroDescription}>
            Join over 140,000 active players right now! Participate in
            faction wars and claim legendary rewards.
          </p>

          <div className={style.heroButtons}>
            <button
              onClick={() => openGame(FEATURED_GAMES[0], true)}
              className={style.primaryBtn}
            >
              🎮 Play Now
            </button>

            <button
              onClick={() => openGame(FEATURED_GAMES[0])}
              className={style.secondaryBtn}
            >
              Details
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
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={style.searchInput}
              aria-label="Search games"
            />
          </div>
        </div>

        <section className={style.gamesSection}>
          <div className={style.sectionHeader}>
            <h3 className={style.sectionTitle}>
              Online Multiplayer Games
            </h3>

            <span className={style.resultCount}>
              Found: {filteredGames.length}{' '}
              {filteredGames.length === 1 ? 'game' : 'games'}
            </span>
          </div>

          <div className={style.gamesGrid}>
            {filteredGames.length === 0 ? (
              <div className={style.noResults}>
                <p className={style.noResultsTitle}>
                  No Games Found
                </p>
                <p>
                  Try changing your search term or category.
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
                        LIVE
                      </span>
                    )}

                    <div className={style.cardOverlay}>
                      <button
                        onClick={() => openGame(game, true)}
                        className={style.playNowBtn}
                      >
                        ⚡ Join Now
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
                        Details →
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
                aria-label="Close modal"
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
                    Launching: {activeGame.title}
                  </h3>

                  <p className={style.launchDescription}>
                    Connecting to the cloud gaming server.
                    Creating your session and preparing your
                    hardware...
                  </p>

                  <div
                    className={style.progressBarContainer}
                    aria-label="Preparing game session"
                  >
                    <div className={style.progressBarFill} />
                  </div>

                  <p className={style.launchNote}>
                    Preparing your gaming session...
                  </p>

                  <button
                    onClick={closeModal}
                    className={style.secondaryBtn}
                  >
                    Cancel Session
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
                        Close
                      </button>

                      <button
                        onClick={() => setIsPlaying(true)}
                        className={style.primaryBtn}
                      >
                        🚀 Join Cloud Game
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