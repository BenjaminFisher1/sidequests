-- Adminer 5.4.1 PostgreSQL 18.1 dump

INSERT INTO "profiles" ("id", "username", "bio", "quests_hosted", "quests_completed", "quests_joined", "created_at")
VALUES ('1a1b5111-15f2-4a2b-9e22-3bb5128d5b54', 'epictester', NULL, 0, 0, 0, '2025-11-25 22:44:10.685083'),
       ('66dcc63d-c0ed-4825-9dca-d103f7195502', 'julian2', 'hello i am julian.... im super freaking epic haha

check out my profile!

i like cats!', 0, 0, 0, '2025-11-25 18:58:00.983041'),
       ('8de7ef3a-d8a7-4cfb-b0a6-33ad802d7a86', 'sidequestsluvr', NULL, 0, 0, 0, '2025-12-03 21:16:25.547045'),
       ('27940afe-7d80-4892-a35f-9a79b3476181', 'thewizardofmagicc', NULL, 0, 0, 0, '2025-12-09 23:04:47.696136');

INSERT INTO "credentials" ("user_id", "id", "public_key", "counter", "backed_up", "transports")
VALUES ('66dcc63d-c0ed-4825-9dca-d103f7195502', 'UbpldioCTD6i1MbBXoSKkw',
        'pQECAyYgASFYINCr6pEEkqmhwmHGazDNGl_-vbe-x3xk75ZR4Jj3y1PCIlggJmytQWZ4xaGk8TZ7wYvExQyU4bAcpjUrLVvOwwXPhBE', 0,
        '1', '{internal,hybrid}'),
       ('1a1b5111-15f2-4a2b-9e22-3bb5128d5b54', 'mjReVzQoQTeCHZ8Gxq4Img',
        'pQECAyYgASFYIAp7ABSozyyI3poupqHayy2kAribekRno5S5kv__kMeaIlggka51AGwdelVtNkkXWWlQUX_V0UIcdfRu6ikJyB7FkJs', 0,
        '1', '{internal,hybrid}'),
       ('8de7ef3a-d8a7-4cfb-b0a6-33ad802d7a86', 'o9sDEKvGRXm5MOA1CAcfAA',
        'pQECAyYgASFYIF8XqUZ7CwwDRmVfWQhn4rA-wEe6m0HXO2Z2ffdbJ3JIIlggMof2T82CMWxF6MFj5AUthdROHoyKTahNYR8trKEruyA', 0,
        '1', '{internal,hybrid}'),
       ('27940afe-7d80-4892-a35f-9a79b3476181', '4hN01bLEQSuEAHt0Yn5YZw',
        'pQECAyYgASFYIHXuwxNK22zsGNRcAy6rynltQ-5yqUYHifw_289TGirpIlggdT-sd80iMPgeb_EpsMsvdghTmOtuNWQbaLJbginIp3Q', 0,
        '1', '{internal,hybrid}');

INSERT INTO "buddies" ("sender_user_id", "receiver_user_id", "sent_at", "accepted_at")
VALUES ('1a1b5111-15f2-4a2b-9e22-3bb5128d5b54', '8de7ef3a-d8a7-4cfb-b0a6-33ad802d7a86', '2025-12-04 00:09:45.663158+00',
        '2025-12-03 18:57:31.143+00'),
       ('66dcc63d-c0ed-4825-9dca-d103f7195502', '1a1b5111-15f2-4a2b-9e22-3bb5128d5b54', '2025-12-06 21:48:54.995097+00',
        NULL),
       ('8de7ef3a-d8a7-4cfb-b0a6-33ad802d7a86', '66dcc63d-c0ed-4825-9dca-d103f7195502', '2025-12-09 00:50:04.156295+00',
        NULL),
       ('66dcc63d-c0ed-4825-9dca-d103f7195502', '8de7ef3a-d8a7-4cfb-b0a6-33ad802d7a86', '2025-12-09 22:36:17.376306+00',
        NULL),
       ('27940afe-7d80-4892-a35f-9a79b3476181', '66dcc63d-c0ed-4825-9dca-d103f7195502', '2025-12-09 23:05:37.306817+00',
        '2025-12-09 18:06:36.553+00');

INSERT INTO "quests" ("id", "host_id", "title", "description", "location", "is_active", "start_time", "end_time",
                      "created_at")
VALUES ('74970b11-c4e3-434e-bd2d-83c26cb3e6cc', '66dcc63d-c0ed-4825-9dca-d103f7195502', 'hello what the fuck',
        'amazing description', 'my butt', '1', '2025-12-02 18:00:00+00', '2025-12-03 20:00:00+00',
        '2025-11-26 03:35:45.565323'),
       ('cc66a090-0630-4b13-807c-f8896100e050', '1a1b5111-15f2-4a2b-9e22-3bb5128d5b54',
        'come play with my new kitties!',
        'i just got new kitty cats and I would love if people could come and play with them :)',
        'my house (dm for deets)', '1', '2025-12-05 17:30:00+00', '2025-12-06 17:30:00+00',
        '2025-12-02 00:21:35.561513'),
       ('9b49411d-7909-4208-9549-99a5852e088e', '66dcc63d-c0ed-4825-9dca-d103f7195502',
        'come study with me at the library!', 'im gonna be studying at the library, come and study with me!',
        'sojourner truth library', '1', '2025-12-18 17:30:00+00', '2025-12-22 19:00:00+00',
        '2025-11-25 23:47:57.676254'),
       ('524221cb-130d-42cd-a646-ea6d0459f65c', '8de7ef3a-d8a7-4cfb-b0a6-33ad802d7a86', 'poopy poo',
        'testing the dates because why', 'woke pronouns school', '1', '2025-12-14 18:00:00+00',
        '2025-12-15 18:00:00+00', '2025-12-03 20:29:44.379109');

INSERT INTO "questers" ("quest_id", "user_id", "was_absent", "joined_at")
VALUES ('74970b11-c4e3-434e-bd2d-83c26cb3e6cc', '1a1b5111-15f2-4a2b-9e22-3bb5128d5b54', '0',
        '2025-12-02 02:42:14.967541'),
       ('9b49411d-7909-4208-9549-99a5852e088e', '8de7ef3a-d8a7-4cfb-b0a6-33ad802d7a86', '0',
        '2025-12-09 00:35:16.763984'),
       ('524221cb-130d-42cd-a646-ea6d0459f65c', '66dcc63d-c0ed-4825-9dca-d103f7195502', '0',
        '2025-12-09 22:57:56.426559');

INSERT INTO "comments" ("id", "user_id", "quest_id", "content", "created_at")
VALUES ('fd6c72be-76b8-4f7a-9bf8-2a3c4dd48753', '66dcc63d-c0ed-4825-9dca-d103f7195502',
        '74970b11-c4e3-434e-bd2d-83c26cb3e6cc', 'hello!!!', '2025-11-26 03:41:51.893204+00'),
       ('76f3b9ee-160b-414b-978b-bb8b3f44a7c1', '1a1b5111-15f2-4a2b-9e22-3bb5128d5b54',
        '74970b11-c4e3-434e-bd2d-83c26cb3e6cc', 'testing2', '2025-12-01 20:51:12.240444+00'),
       ('3a88a24f-424e-4f0d-9834-25d7d2c695dc', '1a1b5111-15f2-4a2b-9e22-3bb5128d5b54',
        '74970b11-c4e3-434e-bd2d-83c26cb3e6cc', 'refresh please', '2025-12-01 20:51:33.601382+00'),
       ('f92aec4e-c6bd-4dea-bb7b-a19fcb2c6497', '1a1b5111-15f2-4a2b-9e22-3bb5128d5b54',
        '9b49411d-7909-4208-9549-99a5852e088e', 'hello!', '2025-12-01 20:52:32.290173+00'),
       ('1e1c4b17-cb56-44d6-973a-536f2c1430f8', '1a1b5111-15f2-4a2b-9e22-3bb5128d5b54',
        '9b49411d-7909-4208-9549-99a5852e088e', 'super cool!', '2025-12-02 00:25:33.346844+00'),
       ('1afbd919-8b2d-4a35-a240-75436515db40', '66dcc63d-c0ed-4825-9dca-d103f7195502',
        '524221cb-130d-42cd-a646-ea6d0459f65c', 'hello', '2025-12-06 22:03:39.085674+00'),
       ('ec632715-2648-4341-95c2-a4dac6c162ee', '66dcc63d-c0ed-4825-9dca-d103f7195502',
        '524221cb-130d-42cd-a646-ea6d0459f65c', 'hello', '2025-12-06 22:03:41.391792+00'),
       ('4fe1e088-fe3a-4211-9054-b48720d6640a', '66dcc63d-c0ed-4825-9dca-d103f7195502',
        '9b49411d-7909-4208-9549-99a5852e088e', 'gfbrbbt', '2025-12-09 22:58:17.793652+00');

-- 2025-12-10 18:44:54 UTC