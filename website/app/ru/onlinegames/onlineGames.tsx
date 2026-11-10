
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
    genre: 'MMORPG / Открытый мир',
    players: '142.8 тыс. онлайн',
    rating: 4.9,
    image:
      'https://placehold.co/600x400/1e1b4b/818cf8?text=Chrono+Odyssey',
    badge: 'Мировая премьера',
    description:
      'Исследуй открытый мир, где время — твоё главное оружие. Участвуй в масштабных осадах гильдий и получай легендарные награды.',
    isLive: true,
  },
  {
    id: 2,
    title: 'Apex Vanguard: Zero',
    genre: 'Тактический шутер',
    players: '310.4 тыс. онлайн',
    rating: 4.8,
    image:
      'https://placehold.co/600x400/31101d/f43f5e?text=Apex+Vanguard',
    badge: 'Киберспортивный турнир',
    description:
      'Напряжённые тактические сражения в формате 5 на 5 с продвинутой системой передвижения и разрушаемым окружением.',
    isLive: true,
  },
  {
    id: 3,
    title: 'Cyberpunk Drift 2142',
    genre: 'Гонки / Киберпанк',
    players: '89.2 тыс. онлайн',
    rating: 4.7,
    image:
      'https://placehold.co/600x400/064e3b/34d399?text=Cyberpunk+Drift',
    badge: 'Новый сезон',
    description:
      'Настраивай антигравитационные гоночные автомобили и покоряй неоновые магистрали Нео-Токио.',
    isLive: true,
  },
  {
    id: 4,
    title: 'Soul Knight Arena',
    genre: 'Экшен / MOBA',
    players: '215.1 тыс. онлайн',
    rating: 4.9,
    image:
      'https://placehold.co/600x400/451a03/fbbf24?text=Soul+Knight',
    badge: 'В тренде',
    description:
      'Динамичные сражения с легендарными героями, магическими комбинациями и соревновательной рейтинговой системой.',
    isLive: true,
  },
  {
    id: 5,
    title: 'Stellar Odyssey Survival',
    genre: 'Выживание / Космос',
    players: '64.7 тыс. онлайн',
    rating: 4.6,
    image:
      'https://placehold.co/600x400/172554/60a5fa?text=Stellar+Odyssey',
    description:
      'Строй орбитальные станции, собирай ресурсы и защищай свой флот от инопланетных угроз.',
    isLive: false,
  },
  {
    id: 6,
    title: 'Arcane Legends Online',
    genre: 'Фэнтези / RPG',
    players: '98.3 тыс. онлайн',
    rating: 4.8,
    image:
      'https://placehold.co/600x400/581c87/c084fc?text=Arcane+Legends',
    badge: 'Обновление 4.2',
    description:
      'Освой древнюю магию, покоряй подземелья драконов и торгуй предметами на внутриигровом рынке.',
    isLive: true,
  },
]

const CATEGORIES = [
  'Все',
  'MMORPG',
  'Тактический шутер',
  'Гонки',
  'Экшен',
  'Выживание',
]

const OnlineGamesTY: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeGame, setActiveGame] = useState<Game | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const filteredGames = FEATURED_GAMES.filter((game) => {
    const matchesCategory =
      selectedCategory === 'Все' ||
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
            Главный турнир — В ПРЯМОМ ЭФИРЕ
          </div>

          <h2 className={style.heroTitle}>
            CHRONO ODYSSEY: ОСАДА МИРА
          </h2>

          <p className={style.heroDescription}>
            Присоединяйся к более чем 140 000 активных игроков прямо
            сейчас! Участвуй в войнах фракций и получай легендарные
            награды.
          </p>

          <div className={style.heroButtons}>
            <button
              onClick={() => openGame(FEATURED_GAMES[0], true)}
              className={style.primaryBtn}
            >
              🎮 Играть сейчас
            </button>

            <button
              onClick={() => openGame(FEATURED_GAMES[0])}
              className={style.secondaryBtn}
            >
              Подробнее
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
              placeholder="Поиск игр..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={style.searchInput}
              aria-label="Поиск игр"
            />
          </div>
        </div>

        <section className={style.gamesSection}>
          <div className={style.sectionHeader}>
            <h3 className={style.sectionTitle}>
              Сетевые многопользовательские игры
            </h3>

            <span className={style.resultCount}>
              Найдено: {filteredGames.length}{' '}
              {filteredGames.length === 1
                ? 'игра'
                : filteredGames.length >= 2 &&
                    filteredGames.length <= 4
                  ? 'игры'
                  : 'игр'}
            </span>
          </div>

          <div className={style.gamesGrid}>
            {filteredGames.length === 0 ? (
              <div className={style.noResults}>
                <p className={style.noResultsTitle}>
                  Игры не найдены
                </p>
                <p>
                  Попробуй изменить поисковый запрос или выбрать
                  другую категорию.
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
                        В СЕТИ
                      </span>
                    )}

                    <div className={style.cardOverlay}>
                      <button
                        onClick={() => openGame(game, true)}
                        className={style.playNowBtn}
                      >
                        ⚡ Присоединиться
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
                        Подробнее →
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
                aria-label="Закрыть окно"
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
                    Запуск: {activeGame.title}
                  </h3>

                  <p className={style.launchDescription}>
                    Подключение к облачному игровому серверу.
                    Создаётся игровая сессия и подготавливаются
                    необходимые ресурсы...
                  </p>

                  <div
                    className={style.progressBarContainer}
                    aria-label="Подготовка игровой сессии"
                  >
                    <div className={style.progressBarFill} />
                  </div>

                  <p className={style.launchNote}>
                    Подготавливаем твою игровую сессию...
                  </p>

                  <button
                    onClick={closeModal}
                    className={style.secondaryBtn}
                  >
                    Отменить сессию
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
                        Закрыть
                      </button>

                      <button
                        onClick={() => setIsPlaying(true)}
                        className={style.primaryBtn}
                      >
                        🚀 Играть через облако
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
