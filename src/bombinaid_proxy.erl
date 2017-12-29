%%%-------------------------------------------------------------------
%% @doc bombinaid top level proxy.
%% @end
%%%-------------------------------------------------------------------

-module(bombinaid_proxy).

%% config callbacks
-export([init/2]).

init(Req0, Opts) ->
    Method = cowboy_req:method(Req0),

    Req = handle_request(Method, cowboy_req:binding(query, Req0), Opts, Req0),
    {ok, Req, Opts}.

handle_request(<<"GET">>, Query, [State], Req) ->

    Key = maps:get(api_key, State),
    EngineId = maps:get(engine_id, State),

    BaseUrl = "https://www.googleapis.com/customsearch/v1",
    BaseQueryUrl = BaseUrl ++ "?key=" ++ Key ++ "&cx=" ++ EngineId ++ "&q=" ++ http_uri:encode(Query),

    io:format("~p~n", [BaseQueryUrl]),

    case httpc:request(get, {BaseQueryUrl, []}, [], []) of
        {ok, {{"HTTP/1.1", StatusCode, _}, _, Body}}->

            if
                StatusCode == 200 ->
                    %% Once we get the results parse the results.
                    Result = jiffy:decode(Body, [return_maps]),
                    Items = maps:get(<<"items">>, Result),

                    cowboy_req:reply(200, #{<<"content-type">> => <<"application/json">>}, jiffy:encode(Items), Req);
                true->
                    cowboy_req:reply(500, #{<<"content-type">> => <<"application/json">>}, Body, Req)
            end;
        {error, Error}->
            io:format("Error: ~w~n", [Error]),
            cowboy_req:reply(500, #{}, <<"Invalid response!">>, Req)
    end;

handle_request(_, _, _, Req)->
    cowboy_req:reply(405, Req).


html_encode(Text) ->
    [_ | DecodedHTML] = xmerl:export_simple([{#{}, [], 0, [], text, Text}], xmerl_xml),
    erlang:iolist_to_binary(DecodedHTML).
