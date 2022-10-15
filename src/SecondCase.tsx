import React, { ReactElement, useState } from 'react'

const COURTS = [
  {
    id: 1,
    districtCourtId: 1,
    name: 'Sąd Rejonowy dla Krakowa-Krowodrzy w Krakowie',
    contact: {
      address: 'Przy Rondzie 7',
      zipCode: '31-547',
      city: 'Kraków',
      phoneNumber: '(12) 619 53 10',
      email: 'sad@krakow-krowodrza.sr.gov.pl',
    },
    jurisdiction: {
      cities: [{ city: 'Kraków', district: 'Krowodrza' }],
      communities: [
        'Czernichów',
        'Jerzmanowice-Przeginia',
        'Krzeszowice',
        'Liszki',
        'Wielka Wieś',
        'Zabierzów',
        'Zielonki',
      ],
    },
    department: {
      wc: 'Wydział Cywilny',
      wg: 'Wydział Gospodarczy',
      wp: 'Wdział Pracy i Ubezpieczeń Społecznych',
    },
  },
  {
    id: 2,
    districtCourtId: 1,
    name: 'Sąd Rejonowy dla Krakowa-Nowej Huty w Krakowie',
    contact: {
      address: 'Przy Rondzie 7',
      zipCode: '31-547',
      city: 'Kraków',
      phoneNumber: '(12) 286 32 83',
      email: 'kontakt@krakow-nowahuta.sr.gov.pl',
    },
    jurisdiction: {
      cities: [{ city: 'Kraków', district: 'Nowa Huta' }],
      communities: [
        'Igołomia-Wawrzeńczyce',
        'Kocmyrzów-Luborzyca',
        'Koniusza',
        'Koszyce',
        'Nowe Brzesko',
        'Pałecznica',
        'Proszowice',
        'Radziemice',
      ],
    },
    department: {
      wc: 'Wydział Cywilny',
      wg: 'Wydział Gospodarczy',
      wp: 'Wdział Pracy i Ubezpieczeń Społecznych',
    },
  },
  {
    id: 3,
    districtCourtId: 2,
    name: 'Sąd Rejonowy w Brzesku',
    contact: {
      address: 'Kościuszki 20',
      zipCode: '32-800',
      city: 'Brzesko',
      phoneNumber: '(14) 664 61 01',
      email: 'boi@brzesko.sr.gov.pl',
    },
    jurisdiction: {
      cities: [{ city: 'Brzesko' }],
      communities: [
        'Borzęcin',
        'Brzesko',
        'Czchów',
        'Dębno',
        'Gnojnik',
        'Iwkowa',
        'Szczurowa',
        'Zakliczyn',
      ],
    },
    department: {
      wc: 'Wydział Cywilny',
      wg: 'Wydział Gospodarczy',
      wp: 'Wdział Pracy i Ubezpieczeń Społecznych',
    },
  },
]

export const SecondCase = (): ReactElement => {
  const [firstInput, setFirstInput] = useState('')
  const [secondInput, setSecondInput] = useState('')
  const data = [COURTS[0]]

  if (firstInput !== secondInput) {
    data.push(COURTS[2])
  }

  return (
    <>
      <div className="Section">
        <div className="Question">
          Pozew o ustalenie istnienia stosunku pracy
        </div>
      </div>
      <div className="Section">
        <div>Gdzie znajduje się siedziba pracodawcy?</div>
        <input
          className="Input"
          value={firstInput}
          onChange={(e) => setFirstInput(e.target.value)}
        />
      </div>
      <div className="Section">
        <div>Gdzie praca jest/była/miała być wykonywana?</div>
        <input
          className="Input"
          value={secondInput}
          onChange={(e) => setSecondInput(e.target.value)}
        />
      </div>
      {firstInput && secondInput && (
        <div className="Section">
          {data.map((place) => (
            <div className="Section" key={place.id}>
              <div className="Result">
                <div>{place.name}</div>
                <div>{place.department?.wp}</div>
                <div>{place.contact.city}</div>
                <div>
                  {place.contact.address} {place.contact.zipCode}
                </div>
                <div>{place.contact.phoneNumber}</div>
                <div>{place.contact.email}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
