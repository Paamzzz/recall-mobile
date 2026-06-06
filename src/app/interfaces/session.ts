import { Card } from './card'

export interface Session {
     currentCard: number,
     allCards: Card[],
     correctCards: Card[];
     wrongCards: Card[];
}
