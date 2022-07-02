CREATE TABLE public.bookmarks (
	id serial4 NOT NULL,
    user_id serial4,
    FOREIGN KEY (user_id) REFERENCES users(id),
    animal_id serial4,
    FOREIGN KEY (animal_id) REFERENCES animals(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    CONSTRAINT bookmarks_pkey PRIMARY KEY (id)
);