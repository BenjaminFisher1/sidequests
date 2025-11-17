create table if not exists profiles
(
    id               int                                   not null
        primary key,
    username         tinytext                              not null,
    bio              text                                  null,
    quests_hosted    int       default 0                   not null,
    quests_completed int       default 0                   not null,
    quests_joined    int       default 0                   not null,
    created_at       timestamp default current_timestamp() not null,
    constraint profiles_username
        unique (username) using hash
);

create table if not exists quests
(
    id          int       default uuid()              not null
        primary key,
    host_id     int                                   not null,
    title       text                                  not null,
    description text                                  null,
    location    text                                  not null,
    created_at  timestamp default current_timestamp() not null,
    start_time  timestamp                             not null,
    end_time    timestamp                             not null,
    constraint quests_host_id_fk
        foreign key (host_id) references profiles (id)
);

create table if not exists questers
(
    quest_id   int                                    not null
        primary key,
    user_id    int                                    not null,
    was_absent tinyint(1) default 0                   not null,
    joined_at  timestamp  default current_timestamp() not null,
    constraint questers_quest_id_fkey
        foreign key (quest_id) references quests (id)
            on delete cascade,
    constraint questers_user_id_fkey
        foreign key (user_id) references profiles (id)
            on delete cascade
);


