import { InMemoryDbService } from 'angular2-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let recipes = [
      {id: 11, name: 'Lasagne'},
      {id: 12, name: 'Spaghetti a la Carbonara'},
      {id: 13, name: 'Pasta med tunfisk'},
      {id: 14, name: '3 timers kødsovs'},
      {id: 15, name: 'Frikadeller'},
      {id: 16, name: 'Koteletter i fad'},
      {id: 17, name: 'Pitabrød'},
      {id: 18, name: 'Ciabatta'},
      {id: 19, name: 'Surdej'},
      {id: 20, name: 'Dadelkugler'}
    ];
    return {recipes};
  }
}
