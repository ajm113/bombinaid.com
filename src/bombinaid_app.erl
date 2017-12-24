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
    Dispatch = cowboy_router:compile([
            {'_', [
                {"/", cowboy_static, {priv_file, bombinaid, "index.html"}},
                {"/assets/[...]", cowboy_static, {priv_dir, bombinaid, "/assets"}}
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
