export interface Deck {
     id: string; 
     lastResult: number;
     name: string;
     description: string;
     type: 'comportamental' | 'tecnico';
     seniority: 'junior'| 'pleno'| 'senior';
     totalCards: number;
};
