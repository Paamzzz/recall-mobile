import { Card } from './card'

export interface Session {
     currentCard: number,
     totalCards: card[],
     correctCards: Card[];
     wrongCards: Card[];
     skippedCards: Card[];
}
