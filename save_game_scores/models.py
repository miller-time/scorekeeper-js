from google.appengine.ext import ndb

class SavedGame(ndb.Model):
    user_id = ndb.StringProperty()
    game_data = ndb.JsonProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)
    updated = ndb.DateTimeProperty(auto_now=True)

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'game_id': self.key.id(),
            'game_data': self.game_data,
            'created': self.created.isostring(),
            'updated': self.updated.isostring()
        }

    @classmethod
    def find_for_user(cls, user_id):
        return cls.query(cls.user_id == user_id)
