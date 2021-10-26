INSERT INTO feed_app_users(Email, Password) VALUES('sigve@hvl.no', 'passord1')
INSERT INTO feed_app_users(Email, Password) VALUES('oscar@hvl.no', 'passord2')
INSERT INTO feed_app_users(Email, Password) VALUES('nabil@hvl.no', 'passord3')
INSERT INTO feed_app_users(Email, Password) VALUES('janne@hvl.no', 'passord4')

INSERT INTO polls (user_id, time_limit, is_active, question) VALUES ((SELECT id from feed_app_users WHERE email='janne@hvl.no'), 100, 1, 'Is it Monday?')
INSERT INTO polls (user_id, time_limit, is_active, question) VALUES ((SELECT id from feed_app_users WHERE email='sigve@hvl.no'), 50, 1, 'Do you like Cats?')
INSERT INTO polls (user_id, time_limit, is_active, question) VALUES ((SELECT id from feed_app_users WHERE email='sigve@hvl.no'), 100, 0, 'Is it raining today?')

INSERT INTO votes(poll_id, yes_votes, no_votes) VALUES ((SELECT id from polls where id=1), 20, 30)
INSERT INTO votes(poll_id, yes_votes, no_votes) VALUES ((SELECT id from polls where id=2), 50, 30)