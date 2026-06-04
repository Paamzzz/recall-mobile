import { Card } from './card'

export interface Session {
     currentCard: number,
     totalCards: number,
     correctCards: Card[];
     wrongCards: Card[];
     skippedCards: Card[];
}
