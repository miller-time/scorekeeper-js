import json
from flask import request, jsonify
from flask.views import MethodView
from google.appengine.api import users

from save_game_scores import app
from save_game_scores.models import SavedGame

class SavedGameListApi(MethodView):
    def get(self):
        user = users.get_current_user()
        if not user:
            return jsonify(error="Not logged in"), 400
        saved_games = SavedGame.find_for_user(user.user_id())
        return jsonify(saved_games=[s.to_dict() for s in saved_games])

    def post(self):
        user = users.get_current_user()
        if not user:
            return jsonify(error="Not logged in"), 400
        saved_game_json = request.get_json(force=True, silent=True)
        if not saved_game_json:
            return jsonify(error="Malformed JSON"), 400
        saved_game = SavedGame(
            user_id=user.user_id(),
            game_data=json.dumps(saved_game_json)
        )
        saved_game.put()
        return jsonify(message="Saved game successfully", game_id=saved_game.key.id())

app.add_url_rule(
    '/api/saved_games',
    view_func=SavedGameListApi.as_view('saved_game_list_api'),
    methods=['GET', 'POST']
)

class SavedGameApi(MethodView):
    def put(self, game_id):
        saved_game = SavedGame.get_by_id(int(game_id))
        user = users.get_current_user()
        if not user or user.user_id() != saved_game.user_id:
            return jsonify(error="Invalid user to save this game"), 400

        saved_game_json = request.get_json(force=True, silent=True)
        if not saved_game_json:
            return jsonify(error="Malformed JSON"), 400

        saved_game.game_data = json.dumps(saved_game_json)
        saved_game.put()
        return jsonify(message="Saved game successfully")

    def delete(self, game_id):
        saved_game = SavedGame.get_by_id(int(game_id))
        user = users.get_current_user()
        if not user or user.user_id() != saved_game.user_id:
            return jsonify(error="Invalid user to delete this game"), 400

        saved_game.key.delete()
        return jsonify(message="Deleted")

app.add_url_rule(
    '/api/saved_games/<game_id>',
    view_func=SavedGameApi.as_view('saved_game_api'),
    methods=['PUT', 'DELETE']
)
