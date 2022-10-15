import React, { ReactElement, useState } from 'react'
import { CASE_TYPE } from './App'

enum JURISDICTION_TYPE {
  sr = 'sr',
  so = 'so',
}

enum SIMPLE_ANWSER {
  yes = 'yes',
  dontKnow = 'dontKnow',
  no = 'no',
}

enum PERSON {
  person = 'person',
  legalPerson = 'legalPerson',
}

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
    },
  },
]

const DISTRICT_COURTS = [
  {
    id: 1,
    courtOfAppeal: 'Sąd Apelacyjny w Krakowie',
    name: 'Sąd Okręgowy w Krakowie',
    contact: {
      address: 'Przy Rondzie 7',
      zipCode: '31-547',
      city: 'Kraków',
      phoneNumber: '(12) 619 50 86',
      email: 'informacja@krakow.so.gov.pl',
    },
  },
  {
    id: 2,
    courtOfAppeal: 'Sąd Apelacyjny w Krakowie',
    name: 'Sąd Okręgowy w Tarnowie',
    contact: {
      address: 'Dąbrowskiego 27',
      zipCode: '33-100',
      city: 'Tarnów',
      phoneNumber: '(14) 688 74 44',
      email: 'informacja@tarnow.so.gov.pl',
    },
  },
]

export const FirstCase = (): ReactElement => {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const handleCaseChoose = (key: string, value: string) => (): void =>
    setAnswers({ ...answers, [key]: value })
  const handleInputChange = ({ target }: any): void => {
    handleCaseChoose('address', target.value)()
  }
  const addresses = [
    { street: 'Zdrowa', city: 'Krakow', district: 'Krowodrza' },
    { street: 'aleja Solidarności', city: 'Krakow', district: 'Nowa Huta' },
    { street: 'Tadeusza Kościuszki', city: 'Brzesko' },
    { street: 'Czernichów', city: 'Czernichów', community: 'Czernichów' },
  ]
  const address =
    addresses.filter(
      (address) =>
        address.street.includes(answers.address) ||
        address.city.includes(answers.address) ||
        address.community?.includes(answers.address)
    )[0] || null

  const prevPlace: any =
    answers.address && address
      ? COURTS.find(
          (court) =>
            court.jurisdiction.cities.find(
              (city) =>
                city.city === address.city ||
                // @ts-ignore
                city.district === address.district
            ) ??
            court.jurisdiction.communities.find(
              (community) => community === address.community
            )
        )
      : null
  const place = prevPlace
    ? answers.jurisdictionType !== JURISDICTION_TYPE.sr
      ? {
          ...(DISTRICT_COURTS.find(
            (court) => court.id === prevPlace.districtCourtId
          ) ?? {}),
          ...(prevPlace.department ? { department: prevPlace.department } : {}),
        }
      : prevPlace
    : null

  return (
    <div className="App">
      <div className="Section">
        <div className="Question">Pozew o zapłatę - umowa pożyczki</div>
      </div>
      <div className="Section">
        <div className="Question">
          Czy w umowie pożyczki został ustalony sąd właściwy?
        </div>

        <div className="Choices">
          {[
            { text: 'Tak', value: SIMPLE_ANWSER.yes },
            { text: 'Nie wiem', value: SIMPLE_ANWSER.dontKnow },
            { text: 'Nie', value: SIMPLE_ANWSER.no },
          ].map((choice) => (
            <div
              className={`Choice ${
                answers.isCourtInAgreement === choice.value
                  ? 'Choice--Selected'
                  : ''
              }`}
              onClick={handleCaseChoose('isCourtInAgreement', choice.value)}
              key={choice.value}
            >
              {choice.text}
            </div>
          ))}
        </div>
      </div>
      <div className="Section">
        {answers.isCourtInAgreement === SIMPLE_ANWSER.yes && (
          <div className="Result">
            Skieruj pozew do sądu wskazanego w umowie.
          </div>
        )}
        {answers.isCourtInAgreement === SIMPLE_ANWSER.dontKnow && (
          <div className="Result">
            W razie potrzeby skontaktuj sie z prawnikiem.
          </div>
        )}

        {answers.isCourtInAgreement === SIMPLE_ANWSER.no && (
          <>
            <div className="Question">
              Ile pieniędzy pożyczyłeś na podstawie tej umowy?
            </div>

            <div className="Choices">
              {[
                {
                  text: 'poniżej 75 tys. zł',
                  value: JURISDICTION_TYPE.sr,
                },
                {
                  text: 'powyżej 75 tys. zł',
                  value: JURISDICTION_TYPE.so,
                },
              ].map((choice) => (
                <div
                  className={`Choice ${
                    answers.jurisdictionType === choice.value
                      ? 'Choice--Selected'
                      : ''
                  }`}
                  onClick={handleCaseChoose('jurisdictionType', choice.value)}
                  key={choice.value}
                >
                  {choice.text}
                </div>
              ))}
            </div>

            <div className="Question">Komu pożyczyłeś pieniądze?</div>

            <div className="Choices">
              {[
                {
                  text: 'osoba fizyczna',
                  value: PERSON.person,
                },
                {
                  text: 'przedsiębiorca',
                  value: PERSON.legalPerson,
                },
              ].map((choice) => (
                <div
                  className={`Choice ${
                    answers.borrower === choice.value ? 'Choice--Selected' : ''
                  }`}
                  onClick={handleCaseChoose('borrower', choice.value)}
                  key={choice.value}
                >
                  {choice.text}
                </div>
              ))}
            </div>

            <div className="Question">
              Czy udzieliłes pożyczki jako osoba fizyczna czy przedsiębiorca?
            </div>

            <div className="Choices">
              {[
                {
                  text: 'osoba fizyczna',
                  value: PERSON.person,
                },
                {
                  text: 'przedsiębiorca',
                  value: PERSON.legalPerson,
                },
              ].map((choice) => (
                <div
                  className={`Choice ${
                    answers.leander === choice.value ? 'Choice--Selected' : ''
                  }`}
                  onClick={handleCaseChoose('leander', choice.value)}
                  key={choice.value}
                >
                  {choice.text}
                </div>
              ))}
            </div>

            {answers.borrower && answers.leander && (
              <>
                <div className="Question">
                  {answers.borrower === PERSON.person &&
                    'Gdzie znajduje sie miejsce zamieszkania pozwanego?'}
                  {answers.borrower === PERSON.legalPerson &&
                    'Gdzie znajduje sie siedziba pozwanego?'}
                </div>
                Podaj adres:
                <input
                  type="text"
                  className="Input"
                  onChange={handleInputChange}
                  value={answers.address}
                />
              </>
            )}
          </>
        )}

        {place && answers.isCourtInAgreement === SIMPLE_ANWSER.no && (
          <div className="Section">
            <div className="Result">
              <div>{place.name}</div>
              <div>
                {answers?.borrower === PERSON.legalPerson &&
                answers?.leander === PERSON.legalPerson
                  ? place.department?.wg
                  : place.department?.wc}
              </div>
              <div>{place.contact.city}</div>
              <div>
                {place.contact.street} {place.contact.zipCode}
              </div>
              <div>{place.contact.phoneNumber}</div>
              <div>{place.contact.email}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
