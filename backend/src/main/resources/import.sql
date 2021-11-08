INSERT INTO feed_app_users(Email, Password) VALUES('sigve@hvl.no', 'passord1')
INSERT INTO feed_app_users(Email, Password) VALUES('oscar@hvl.no', 'passord2')
INSERT INTO feed_app_users(Email, Password) VALUES('nabil@hvl.no', 'passord3')
INSERT INTO feed_app_users(Email, Password) VALUES('janne@hvl.no', 'passord4')

INSERT INTO polls (user_id, is_active, is_public, question, yes_votes, no_votes) VALUES ((SELECT id from feed_app_users WHERE email='janne@hvl.no'), 1, 1, 'Is it Monday?', 0, 0)
INSERT INTO polls (user_id, is_active, is_public, question, yes_votes, no_votes) VALUES ((SELECT id from feed_app_users WHERE email='sigve@hvl.no'), 1, 1, 'Do you like Cats?', 0, 0)
INSERT INTO polls (user_id, is_active, is_public, question, yes_votes, no_votes) VALUES ((SELECT id from feed_app_users WHERE email='sigve@hvl.no'), 0, 1, 'Is it raining today?', 0, 0)

