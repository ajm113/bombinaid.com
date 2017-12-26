%%%-------------------------------------------------------------------
%% @doc bombinaid public API
%% @end
%%%-------------------------------------------------------------------

-module(bombinaid_app).

-behaviour(application).

%% Application callbacks
-export([start/2, stop/1]).

%%====================================================================
%% API
%%====================================================================

start(_StartType, _StartArgs) ->

    {ok, ServerState} = bombinaid_config:load("config.erl"),

    Dispatch = cowboy_router:compile([
            {'_', [
                {"/api/search/:query/", bombinaid_proxy, [ServerState]},
                {"/assets/[...]", cowboy_static, {priv_dir, bombinaid, "/assets"}},
                {"/[...]", cowboy_static, {priv_file, bombinaid, "index.html"}}
            ]}
        ]),
        {ok, _} = cowboy:start_clear(http, [{port, 8080}], #{
            env => #{dispatch => Dispatch}
    }),
    bombinaid_sup:start_link().

%%--------------------------------------------------------------------
stop(_State) ->
    ok.

%%====================================================================
%% Internal functions
%%====================================================================
