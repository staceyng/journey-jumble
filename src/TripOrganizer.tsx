import React, { useState } from 'react';

const TripOrganizer: React.FC = () => {
    const [people, setPeople] = useState<string[]>([]);
    const [currentName, setCurrentName] = useState<string>('');
    const [numCars, setNumCars] = useState<number>(0);
    const [driverNames, setDriverNames] = useState<string[]>([]);
    const [results, setResults] = useState<string[][]>([]);

    const shuffle = (array: string[]): string[] => {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const randomizeAndDistribute = () => {
        if (driverNames.length < numCars) {
            alert("You need at least one driver for each car!");
            return;
        }

        const nonDrivers = people.filter(name => !driverNames.includes(name));
        const shuffledNonDrivers = shuffle(nonDrivers);

        const allNames = [...driverNames, ...shuffledNonDrivers];

        let distributed: string[][] = Array.from({ length: numCars }, () => []);
        allNames.forEach((name, index) => {
            distributed[index % numCars].push(name);
        });

        setResults(distributed);
    };

    const addPerson = () => {
        if (!people.includes(currentName)) {
            setPeople(prev => [...prev, currentName]);
            setCurrentName('');
        } else {
            alert("Name already added!");
        }
    };

    return (
        <div>
            {/* Adding People */}
            <div>
                <label>
                    Add a Person: 
                    <input 
                        type="text" 
                        value={currentName} 
                        onChange={e => setCurrentName(e.target.value)} 
                    />
                </label>
                <button onClick={addPerson}>Add</button>
            </div>

            <div>
                All People on the Trip:
                <ul>
                    {people.map(name => <li key={name}>{name}</li>)}
                </ul>
            </div>

            {/* Setting Number of Cars */}
            <div>
                <label>
                    Number of Cars: 
                    <input 
                        type="number" 
                        value={numCars} 
                        onChange={e => setNumCars(Number(e.target.value))} 
                    />
                </label>
            </div>

            {/* Setting Drivers */}
            <div>
                <label>
                    Choose Driver:
                    <select onChange={e => setDriverNames(prev => [...prev, e.target.value])}>
                        <option value="">--Select a Driver--</option>
                        {people.map(person => 
                            (!driverNames.includes(person)) && 
                            <option key={person} value={person}>{person}</option>
                        )}
                    </select>
                </label>
            </div>
            <div>
                Current Drivers:
                <ul>
                    {driverNames.map(name => <li key={name}>{name}</li>)}
                </ul>
            </div>

            <button onClick={randomizeAndDistribute}>Randomize and Distribute</button>
            
            {/* Display Results */}
            {results.map((car, index) => (
                <div key={index}>
                    <h3>Car {index + 1}</h3>
                    <ul>
                        {car.map(person => (
                            <li key={person}>
                                {person}
                                {driverNames.includes(person) && ' (Driver)'}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default TripOrganizer;
