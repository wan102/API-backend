CREATE TABLE public.centres (
	id serial4 NOT NULL,
	name varchar(32) NOT NULL,
    image_url varchar(2048) NULL,
    tel varchar(16) NOT NULL,
	address text NOT NULL,
    note text NULL,
    CONSTRAINT centres_pkey PRIMARY KEY (id)
);
