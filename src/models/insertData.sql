-- DML Commands

INSERT INTO sellers (
    full_name,
    email
) VALUES (
    'seller one',
    'sellerOne@gmail.com'
);

INSERT INTO buyers (
    full_name,
    email
) VALUES (
    'buyer one',
    'buyerOne@gmail.com'
);

INSERT INTO shops (
    seller_id,
    shop_name
) VALUES (
    1,
    'ABC shop'
);

-- Inserting books 

INSERT INTO books (
    "name",
    stock,
    image_url,
    seller_id,
    price,
    "description"
) VALUES (
    'QUIET',
    3,
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCvJnh6uuFPZ2HY9joO0IbvXPLePcJ3XqiVneZvEs9zjXGzcUBI2btGhd3l9ULS-0Il0JftlczQ4S_OmH3SZfc4YLkKWQi3BoSHpqePHgN',
    1,
    175,
    'For far too long, those who are naturally quiet, serious or sensitive have been overlooked. The loudest have taken over - even if they have nothing to say. Its time for everyone to listen. Its time to harness the power of introverts. Its time for Quiet.'
);

INSERT INTO books (
    "name",
    stock,
    image_url,
    seller_id,
    price,
    "description"
) VALUES (
    'As A Man Thinketh',
    89,
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTwvw9Ux6XicwWqWcpgHCMg7fABLuWwjygeBCqGH-j9yNi9KEC40e5YPO9vmRpMnDXZYF_5pF9glRKiyxp5kpE-iGL15nTlqYfcFRIFCN8',
    3,
    125,
    'THIS little self-help volume (the result of meditation and experience) is not intended as an exhaustive treatise on the much-written-upon subject of the power of thought. It is suggestive rather than explanatory, its object being to stimulate men and women to the discovery and perception of the truth that-- "They themselves are makers of themselves." By virtue of the thoughts, which they choose and encourage; that mind is the master-weaver, both of the inner garment of character and the outer garment of circumstance, and that, as they may have hitherto woven in ignorance and pain they may now weave in enlightenment and happiness.'
);

INSERT INTO books (
    "name",
    stock,
    image_url,
    seller_id,
    price,
    "description"
) VALUES (
    'The Secret',
    725,
    'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSatD9ai0FrHJBJJoujpfSW0nd5hAs8_Cd8q_22Uw7jycukjVWEVWYUr22kQm2YeZSiNojiu1i5oO66spqfFIphHCbNr1oL5erd8AH9MdY',
    2,
    455,
    'In 2006, a groundbreaking feature-length film revealed the great mystery of the universe – The Secret. Later that year, Rhonda Byrne followed with a book that became a worldwide bestseller. Fragments of a Great Secret have been found in the oral traditions, in literature, in religions and philosophies throughout the centuries. For the first time, all the pieces of The Secret come together in an incredible revelation that will be life-transforming for all who experience it. In this book, you’ll learn how to use The Secret in every aspect of your life – money, health, relationships, happiness, and in every interaction you have in the world. You’ll begin to understand the hidden, untapped power that’s within you, and this revelation can bring joy to every aspect of your life. The Secret contains wisdom from modern-day teachers – men and women who have used it to achieve health, wealth and happiness. By applying the knowledge of The Secret, they bring to light compelling stories of eradicating obstacles, and achieving what many would regard as impossible. Discover the book which has been changing millions of lives around the world. No matter who you are, where you are right now, no matter what you want – when you realise The Secret you can have anything.'
);

INSERT INTO books (
    "name",
    stock,
    image_url,
    seller_id,
    price,
    "description"
) VALUES (
    'Rich Dad Poor Dad:',
    975,
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSjuV-s7HCtfZeIGQZRW4rsbqfacp3XZftV5G8DkgZsUqw_EKliqyL2UXdJRxEoELZhawrPzOkyt2PxeLYJwJBcKyj9pzeGQ0V-uSo7C3Ne4TJnmgBlf8l9',
    5,
    844,
    'The book is the story of a person (the narrator and author) who has two fathers: the first was his biological father – the poor dad - and the other was the father of his childhood best friend, Mike – the rich dad. Both fathers taught the author how to achieve success but with very disparate approaches. It became evident to the author which fathers approach made more financial sense. Throughout the book, the author compares both fathers – their principles, ideas, financial practices, and degree of dynamism and how his real father, the poor and struggling but highly educated man, paled against his rich dad in terms of asset building and business acumen.'
);

INSERT INTO books (
    "name",
    stock,
    image_url,
    seller_id,
    price,
    "description"
) VALUES (
    'KalhanaS Rajatarangini',
    812,
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTwB_6CZf6U_Op-wG2tNlTnZG7jIfifln5jzA2b4IGvOrdVYWCQpNkNH871oQedAUrNQhhmryAjB5jME9xmOKv-vAvfAyofZw&usqp=CAY',
    1,
    1340,
    'Kalhanas Rajatarangini is the oldest and fullest record of Kashmir history. Sir Stei, recognizing the inestimable value of the only work of its kind, succeeded in publishing the critical edition of the text as in 1892 which has been printed here as Vol. III. Later he followed this illustrious venture by presenting a fully annotated translation of the Chronicle, in two volumes, printed as Vol. I and Vol. II, the former containing the translation of the first seven tarangas from the original Sanskrit and the later that of the remaining eighth taranga'
);

INSERT INTO books (
    "name",
    stock,
    image_url,
    seller_id,
    price,
    "description"
) VALUES (
    'Inner Engineering',
    981,
    'https://cdn.shopify.com/s/files/1/2789/4914/products/buy-inner-engineering-a-yogis-guide-to-joy-book-online-at-low-prices-book-prakash-books-9780143428848-17626544439462_318x468.jpg?v=1628053503',
    3,
    430,
    'The latest book, Inner Engineering: A Yogi’s Guide to Joy, is published by Spiegel & Grau/Random House. For the first time, the book presents Western readers with a path to achieving absolute well-being through the classical science of yoga in a practical, accessible book. It is a means to create inner situations exactly the way you want them, turning you into the architect of your own joy. In this transformative book Sadhguru tells the story of his own awakening, from a boy with an affinity for the natural world, to a young daredevil who crossed the Indian continent on his motorcycle. He relates the moment of his enlightenment on a mountaintop in southern India, from which he emerged radically changed. Today, as the founder of Isha, he lights the path for millions. The wisdom distilled in this accessible, profound, and engaging book offers readers the opportunity to achieve nothing less than a life of joy.'
);

INSERT INTO books (
    "name",
    stock,
    image_url,
    seller_id,
    price,
    "description"
) VALUES (
    'The Wonder That Was India',
    774,
    'https://m.media-amazon.com/images/I/41h9PsJT9kL._SX331_BO1,204,203,200_.jpg',
    4,
    447,
    'People all around the world are fascinated by Indian history, culture and the way people are still connected with their roots. This book covers comprehensive Indian history that includes culture, religion, governance, social evolution, tradition, languages, philosophy and science. It reveals the glorious pas of India from the time of Harappa civilization and settlement to Aryan invasion theory.Starting from Indus Valley civilization along with detailed information about Harappa and Mohenjo-Daro, the book explores early time periods that throw light on India’s rich cultural heritage. It traces various time periods and eras of Indian history with extensive source of text, which is narrative, simple to understand and keeps the reader engaged.Following massive research and findings, the author has even explained about Aryan invasion theory in the book. Furthermore, the book even talks about evolution of Hindu religion that has been followed from the Harappa times and even at the time when Aryans invaded India.The book also highlights some common beliefs and influences in Hinduism, Jainism and Buddhism. All regions in India are influenced by each other, but it was Jainism and Buddhism that mainly brought non-violence and vegetarian aspect into Indian religions.For those who are looking forward to learn some interesting facts about Indian history and culture, the book contains almost everything: from traces of ancient invasions to modern-day evolution for the readers to enjoy and gain knowledge about.'
);

INSERT INTO books (
    "name",
    stock,
    image_url,
    seller_id,
    price,
    "description"
) VALUES (
    'Namaha - Stories From The Land Of Gods And Goddesses',
    174,
    'https://m.media-amazon.com/images/I/91N4qe53szL.jpg',
    2,
    659,
    'People all around the world are fascinated by Indian history, culture and the way people are still connected with their roots. This book covers comprehensive Indian history that includes culture, religion, governance, social evolution, tradition, languages, philosophy and science. It reveals the glorious pas of India from the time of Harappa civilization and settlement to Aryan invasion theory.Starting from Indus Valley civilization along with detailed information about Harappa and Mohenjo-Daro, the book explores early time periods that throw light on India’s rich cultural heritage. It traces various time periods and eras of Indian history with extensive source of text, which is narrative, simple to understand and keeps the reader engaged.Following massive research and findings, the author has even explained about Aryan invasion theory in the book. Furthermore, the book even talks about evolution of Hindu religion that has been followed from the Harappa times and even at the time when Aryans invaded India.The book also highlights some common beliefs and influences in Hinduism, Jainism and Buddhism. All regions in India are influenced by each other, but it was Jainism and Buddhism that mainly brought non-violence and vegetarian aspect into Indian religions.For those who are looking forward to learn some interesting facts about Indian history and culture, the book contains almost everything: from traces of ancient invasions to modern-day evolution for the readers to enjoy and gain knowledge about.'
);

INSERT INTO books (
    "name",
    stock,
    image_url,
    seller_id,
    price,
    "description"
) VALUES (
    'The Origin of Species',
    743,
    'https://m.media-amazon.com/images/I/81Vj1bEo6xS.jpg',
    3,
    159,
    'The theory of natural selection constructed by Charles Darwin is comprised in his revolutionary work of scientific literature called the Origin of Species. This piece of work recounts his ideas on the process of evolution of living beings based on the process of natural selection and it laid down the foundation for evolutionary biology. Initially published for literary reasons, Charles Darwins standing in the scientific circles drew attention to its contents. Inviting criticism from religious circles for its controversial conclusion, the Origin of Species was later accepted by the experts and several theories have been built upon it as addition to the field of evolutionary biology.'
);

INSERT INTO books (
    "name",
    stock,
    image_url,
    seller_id,
    price,
    "description"
) VALUES (
    'How to Win Friends and Influence People in the Digital Age',
    431,
    'https://m.media-amazon.com/images/I/61bBIPfY3qL.jpg',
    1,
    269,
    'A classic adaptation of a timeless self-help book for the new era, How To Win Friends And Influence People In The Digital Age does a wonderful job in inspiring confidence and breeding leaders. The book tries not to preach, but instead uses common sense and a sense of awareness about the world, to help people achieve their highest potential.The book acknowledges that times are changing and fast and management styles from yesteryear, however effective, do not hold up in this corporate and digital world. You need fresh ideas and perspectives, new visions and enigmatic leadership.'
);

INSERT INTO books (
    "name",
    stock,
    image_url,
    seller_id,
    price,
    "description"
) VALUES (
    'Artificial Intelligence and the Future of Power: 5 Battlegrounds',
    406,
    'https://m.media-amazon.com/images/P/B08Q4G6MYD.01._SCLZZZZZZZ_SX500_.jpg',
    4,
    603,
    'Artificial intelligence is only partially visible, just like an iceberg. To understand it fully, we must look beneath the surface. The positive side is that technology is making machines smarter. However, the deeper view explained in this book shows that AI is also making a growing number of people cognitively and psychologically dependent on digital networks. Whether you are a social media Fanatic, a diehard AI aficionado, or a paranoid sceptic, it is impossible to escape the ubiquitous impact of AI.'
);

INSERT INTO books (
    "name",
    stock,
    image_url,
    seller_id,
    price,
    "description"
) VALUES (
    'Mrutyunjay',
    721,
    'https://m.media-amazon.com/images/P/B01N8RJC63.01._SCLZZZZZZZ_SX500_.jpg',
    2,
    450,
    'life of karna'
);