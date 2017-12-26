%%%-------------------------------------------------------------------
%% @doc bombinaid top level config.
%% @end
%%%-------------------------------------------------------------------

-module(bombinaid_config).

%% config callbacks
-export([load/1]).

load(ConfigurationFile) ->
    PrivePath = code:priv_dir(bombinaid),
    AbsoluteConfigurationFilePath = PrivePath ++ "/" ++ ConfigurationFile,

    case file:consult(AbsoluteConfigurationFilePath) of
        {ok, [T]} ->
            Pred = fun(K, V) -> is_valid_option(K) end,
            CleanConfig = maps:filter(Pred, T),
            {ok, CleanConfig};
        Error ->
            Error
    end.

is_valid_option(api_key) -> true;
is_valid_option(engine_id) -> true;
is_valid_option(_) -> false.
