import React from 'react';
import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    };
  }
  onChangeType = (e) => {
    // let target = newType.target;
    // newType.persist();
    this.setState({
      filters: {
        ...this.state.filters,
        type: e.target.value // after obj level {}, put comma, then key.
      }
    });
  };

  onFindPetsClick = () => {
    let URL =
      this.state.filters.type == 'all'
        ? '/api/pets'
        : `/api/pets?type=${this.state.filters.type}`;

    fetch(URL)
      .then((res) => res.json())
      .then((filteredPets) =>
        this.setState({
          pets: filteredPets
        })
      );
  };

  // Pet Browser

  onAdoptPet = (id) => {
    console.log(id);
    this.setState((state) => {
      let adoptedPet = state.pets.find((pet) => pet.id == id);
      adoptedPet.isAdopted = !adoptedPet.isAdopted;
      return state;
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
