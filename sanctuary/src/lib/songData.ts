export interface Song {
  id: string;
  title: string;
  artist: string;
  key: string;
  lyrics: string; // Stored with bracketed chords e.g. [G] Amazing [C] Grace
  lang: "en" | "hi" | "ml" | "ar";
}

export const SEED_SONGS: Song[] = [
  {
    id: "1",
    title: "Amazing Grace",
    artist: "John Newton",
    key: "G",
    lang: "en",
    lyrics: `[G] Amazing [G7] grace! How [C] sweet the [G] sound
That [G] saved a [Em] wretch like [D] me!
I [G] once was [G7] lost, but [C] now am [G] found;
Was [Em] blind, but [D7] now I [G] see.

'Twas [G] grace that [G7] taught my [C] heart to [G] fear,
And [G] grace my [Em] fears re[D]lieved;
How [G] precious [G7] did that [C] grace ap[G]pear
The [Em] hour I [D7] first be[G]lieved.

Through [G] many [G7] dangers, [C] toils and [G] snares,
I [G] have al[Em]ready [D] come;
'Tis [G] grace hath [G7] brought me [C] safe thus [G] far,
And [Em] grace will [D7] lead me [G] home.`
  },
  {
    id: "2",
    title: "How Great Is Our God",
    artist: "Chris Tomlin",
    key: "C",
    lang: "en",
    lyrics: `[C] The splendor of the [Am] King, clothed in majesty
Let all the earth re[F]joice, all the earth rejoice
[C] He wraps Himself in [Am] light, and darkness tries to hide
And trembles at His [F] voice, trembles at His voice

[C] How great is our God, sing with me
[Am] How great is our God, and all will see
How [F] great, how [G] great is our [C] God`
  },
  {
    id: "3",
    title: "In Christ Alone",
    artist: "Keith Getty & Stuart Townend",
    key: "G",
    lang: "en",
    lyrics: `In [G] Christ a[D]lone my [G] hope is [A] found
[D] He is my [G] light, my [D] strength, [Em] my [A] song
This [G] Corner[D]stone, this [G] solid [A] Ground
[D] Firm through the [G] fiercest [D] drought [Em] and [A] storm
What [G] heights of [D] love, what [G] depths of [A] peace
When [D] fears are [G] stilled, when [D] strivings [A] cease
My [G] Comfor[D]ter, my [G] All in [A] All
[D] Here in the [G] love of [D] Christ [Em] I [D] stand`
  },
  {
    id: "4",
    title: "10,000 Reasons (Bless The Lord)",
    artist: "Matt Redman",
    key: "G",
    lang: "en",
    lyrics: `[G] Bless the Lord, O my [C] soul, [G] O my [D] soul,
[C] Worship His [G] holy [D] name.
Sing like [C] never be[G]fore, [C] O my [D] soul, [Em]
I'll [C] worship Your [D] holy [G] name.

The [C] sun comes [G] up, it's a [D] new day [Em] dawning;
[C] It's time to [G] sing Your [D] song a[Em]gain.
What[C]ever may [G] pass, and what[D]ever lies be[Em]fore me,
[C2] Let me be [G] singing when the [D] evening [G] comes.`
  },
  {
    id: "5",
    title: "What A Beautiful Name",
    artist: "Hillsong Worship",
    key: "G",
    lang: "en",
    lyrics: `[G] You were the Word at the beginning,
One with [C] God the Lord [Em] Most [D] High.
[Em] Your hidden glory [D] in cre[G]ation,
Now re[C]vealed in [Em] You our [D] Christ.

What a beautiful Name it [G] is,
What a beautiful Name it [D] is,
The Name of [Em] Jesus [D] Christ my [C] King.
What a beautiful Name it [G/B] is, nothing compares to [D] this,
What a beautiful Name it [Em] is, the [D] Name of [C] Jesus.`
  },
  {
    id: "6",
    title: "Cornerstone",
    artist: "Hillsong Worship",
    key: "C",
    lang: "en",
    lyrics: `[C] My hope is built on nothing less
Than [F] Jesus' blood and [G] righteousness.
I [Am] dare not trust the [Am/G] sweetest frame,
But [F] wholly [G] lean on [C] Jesus' name.

[F] Christ a[Am]lone, [G] Cornerstone,
[C/E] Weak made [F] strong in the [Am] Savior's [G] love.
Through the [C] storm, [F] He is [Am] Lord, Lord of [G] all.`
  },
  {
    id: "7",
    title: "Great Are You Lord",
    artist: "All Sons & Daughters",
    key: "G",
    lang: "en",
    lyrics: `[G] You give life, You are love,
You bring [C] light to the darkness.
[Em] You give hope, You restore
Every [C] heart that is broken.
[G] Great are You, Lord.

It's Your [C] breath in our [Em] lungs,
So we [D] pour out our praise, we pour out our praise.
It's Your [C] breath in our [Em] lungs,
So we [D] pour out our praise to You [G] only.`
  },
  {
    id: "8",
    title: "Yeshu Tera Naam Sabse Uncha Hai",
    artist: "Anil Kant",
    key: "G",
    lang: "hi",
    lyrics: `[G] Yeshu Tera Naam [C] sabse uncha hai
[Am] Sabse uncha hai, [D] sabse uncha hai
[G] Yeshu Tera Naam [C] sabse uncha hai
[Am] Sabse uncha hai, [D] sabse uncha hai [G]

[G] Beemari se shifa [C] milti hai
[Am] Paapon se mukti [D] milti hai
[G] Har ek shaitaan [C] kapta hai
[Am] Jab naam tera [D] liya jata hai [G]`
  },
  {
    id: "9",
    title: "Nanniyeode Njan Sthuthi Padidum",
    artist: "Malayalam Worship",
    key: "D",
    lang: "ml",
    lyrics: `[D] Nanniyeode njan [G] sthuthi padidum
[A] Ente yeshu nathane [D]
[D] Ennil nee cheytha [G] nanmakalkkai
[A] Innere nanni [D] parayunnu njan

[D] Aruliyathal [G] aashvasamame
[A] Kazhchayatal [D] vazhikalame
[D] Ente yeshu nathane [G] sthuthipadum njan
[A] Ee lokavazhiyil [D] thunayayathal`
  },
  {
    id: "10",
    title: "Yasou' Anta Maliki",
    artist: "Arabic Worship",
    key: "Em",
    lang: "ar",
    lyrics: `[Em] Yasou' anta [Am] maliki, wa [D] laho' stajaba [Em] salati
[Em] A'budo'ka ya [Am] ilahee, wa [D] a'ishoo le [Em] khidmateeka

[Em] Fi wasti'dh-dhulmati [Am] anta nooree
[D] Wa fi da'fee anta [Em] quwwatee
[Em] Haleluya, [Am] Haleluya, [D] a'budo'ka ya [Em] ilahee`
  }
];
