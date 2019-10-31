/* eslint-disable */
import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

/** An Anime */
export type Anime = {
  __typename?: 'Anime',
  /** Get the associated MyAnimeList ID */
  readonly malId: Maybe<Scalars['ID']>,
  readonly title: AnimeTitle,
  readonly url: Maybe<Scalars['String']>,
  readonly media: AnimeMedia,
  /** Get a list of anime recommendations that explains why the anime has been recommended. */
  readonly related: ReadonlyArray<RelatedAnimeRecommendations>,
  readonly description: Maybe<Scalars['String']>,
  readonly slug: Scalars['String'],
  readonly episodesCount: Scalars['Int'],
  readonly airing: Scalars['Boolean'],
  readonly score: Scalars['Float'],
  readonly trailerUrl: Maybe<Scalars['String']>,
  readonly status: Scalars['String'],
  readonly duration: Maybe<Scalars['String']>,
  readonly rating: Scalars['String'],
  readonly synonyms: ReadonlyArray<Scalars['String']>,
  readonly type: Scalars['String'],
  readonly rank: Scalars['Int'],
  readonly popularity: Scalars['Int'],
  readonly openingThemes: ReadonlyArray<Scalars['String']>,
  readonly endingThemes: ReadonlyArray<Scalars['String']>,
  readonly broadcast: Maybe<Scalars['String']>,
};


/** An Anime */
export type AnimeRelatedArgs = {
  first?: Maybe<Scalars['Int']>
};

/** Get an anime media */
export type AnimeMedia = {
  __typename?: 'AnimeMedia',
  readonly background: Scalars['String'],
  readonly banner: Maybe<Scalars['String']>,
  readonly poster: Maybe<Scalars['String']>,
};

export type AnimeTitle = {
  __typename?: 'AnimeTitle',
  readonly english: Scalars['String'],
  readonly japanese: Scalars['String'],
};

export type Query = {
  __typename?: 'Query',
  /** Get the animelist of a user */
  readonly animelist: ReadonlyArray<Anime>,
  /** Get recommendations */
  readonly recommendations: ReadonlyArray<Anime>,
  /** Get anime by its slug */
  readonly anime: Maybe<Anime>,
};


export type QueryAnimelistArgs = {
  username: Scalars['String']
};


export type QueryRecommendationsArgs = {
  username: Scalars['String'],
  offset?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QueryAnimeArgs = {
  slug: Scalars['String']
};

/** An Anime recommendation from a viewer perspective that explain why an anime has been recommended */
export type RelatedAnimeRecommendations = {
  __typename?: 'RelatedAnimeRecommendations',
  /** Get the anime that made this recommendation relevant */
  readonly anime: Anime,
  /** The higher the score is, the higher it will be recommended */
  readonly score: Scalars['Int'],
};
export type AnimeRelatedRecommendations_RelatedFragment = (
  { readonly __typename?: 'RelatedAnimeRecommendations' }
  & Pick<RelatedAnimeRecommendations, 'score'>
  & { readonly anime: (
    { readonly __typename?: 'Anime' }
    & { readonly title: (
      { readonly __typename?: 'AnimeTitle' }
      & Pick<AnimeTitle, 'english' | 'japanese'>
    ) }
  ) }
);

export type RecommendationsList_RecommendationFragment = (
  { readonly __typename?: 'Anime' }
  & Pick<Anime, 'episodesCount' | 'duration' | 'url' | 'malId' | 'description' | 'slug'>
  & { readonly title: (
    { readonly __typename?: 'AnimeTitle' }
    & Pick<AnimeTitle, 'english' | 'japanese'>
  ), readonly media: (
    { readonly __typename?: 'AnimeMedia' }
    & Pick<AnimeMedia, 'background' | 'poster' | 'banner'>
  ), readonly related: ReadonlyArray<{ readonly __typename?: 'RelatedAnimeRecommendations' }
    & AnimeRelatedRecommendations_RelatedFragment
  > }
);

export type AnimeDetailQueryVariables = {
  slug: Scalars['String']
};


export type AnimeDetailQuery = (
  { readonly __typename?: 'Query' }
  & { readonly anime: Maybe<{ readonly __typename?: 'Anime' }
    & RecommendationsList_RecommendationFragment
  > }
);

export type RecommendationsQueryVariables = {
  username: Scalars['String'],
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type RecommendationsQuery = (
  { readonly __typename?: 'Query' }
  & { readonly recommendations: ReadonlyArray<{ readonly __typename?: 'Anime' }
    & RecommendationsList_RecommendationFragment
  > }
);
export const AnimeRelatedRecommendations_RelatedFragmentDoc = gql`
    fragment AnimeRelatedRecommendations_related on RelatedAnimeRecommendations {
  score
  anime {
    title {
      english
      japanese
    }
  }
}
    `;
export const RecommendationsList_RecommendationFragmentDoc = gql`
    fragment RecommendationsList_recommendation on Anime {
  title {
    english
    japanese
  }
  episodesCount
  duration
  url
  malId
  description
  slug
  media {
    background
    poster
    banner
  }
  related {
    ...AnimeRelatedRecommendations_related
  }
}
    ${AnimeRelatedRecommendations_RelatedFragmentDoc}`;
export const AnimeDetailDocument = gql`
    query AnimeDetail($slug: String!) {
  anime(slug: $slug) {
    ...RecommendationsList_recommendation
  }
}
    ${RecommendationsList_RecommendationFragmentDoc}`;
export type AnimeDetailComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AnimeDetailQuery, AnimeDetailQueryVariables>, 'query'> & ({ variables: AnimeDetailQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const AnimeDetailComponent = (props: AnimeDetailComponentProps) => (
      <ApolloReactComponents.Query<AnimeDetailQuery, AnimeDetailQueryVariables> query={AnimeDetailDocument} {...props} />
    );
    
export type AnimeDetailProps<TChildProps = {}> = ApolloReactHoc.DataProps<AnimeDetailQuery, AnimeDetailQueryVariables> & TChildProps;
export function withAnimeDetail<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AnimeDetailQuery,
  AnimeDetailQueryVariables,
  AnimeDetailProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, AnimeDetailQuery, AnimeDetailQueryVariables, AnimeDetailProps<TChildProps>>(AnimeDetailDocument, {
      alias: 'withAnimeDetail',
      ...operationOptions
    });
};

    export function useAnimeDetailQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AnimeDetailQuery, AnimeDetailQueryVariables>) {
      return ApolloReactHooks.useQuery<AnimeDetailQuery, AnimeDetailQueryVariables>(AnimeDetailDocument, baseOptions);
    };
      export function useAnimeDetailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AnimeDetailQuery, AnimeDetailQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<AnimeDetailQuery, AnimeDetailQueryVariables>(AnimeDetailDocument, baseOptions);
      };
      
export type AnimeDetailQueryHookResult = ReturnType<typeof useAnimeDetailQuery>;
export type AnimeDetailQueryResult = ApolloReactCommon.QueryResult<AnimeDetailQuery, AnimeDetailQueryVariables>;
export const RecommendationsDocument = gql`
    query Recommendations($username: String!, $limit: Int, $offset: Int) {
  recommendations(username: $username, limit: $limit, offset: $offset) {
    ...RecommendationsList_recommendation
  }
}
    ${RecommendationsList_RecommendationFragmentDoc}`;
export type RecommendationsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<RecommendationsQuery, RecommendationsQueryVariables>, 'query'> & ({ variables: RecommendationsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const RecommendationsComponent = (props: RecommendationsComponentProps) => (
      <ApolloReactComponents.Query<RecommendationsQuery, RecommendationsQueryVariables> query={RecommendationsDocument} {...props} />
    );
    
export type RecommendationsProps<TChildProps = {}> = ApolloReactHoc.DataProps<RecommendationsQuery, RecommendationsQueryVariables> & TChildProps;
export function withRecommendations<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RecommendationsQuery,
  RecommendationsQueryVariables,
  RecommendationsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, RecommendationsQuery, RecommendationsQueryVariables, RecommendationsProps<TChildProps>>(RecommendationsDocument, {
      alias: 'withRecommendations',
      ...operationOptions
    });
};

    export function useRecommendationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecommendationsQuery, RecommendationsQueryVariables>) {
      return ApolloReactHooks.useQuery<RecommendationsQuery, RecommendationsQueryVariables>(RecommendationsDocument, baseOptions);
    };
      export function useRecommendationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecommendationsQuery, RecommendationsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<RecommendationsQuery, RecommendationsQueryVariables>(RecommendationsDocument, baseOptions);
      };
      
export type RecommendationsQueryHookResult = ReturnType<typeof useRecommendationsQuery>;
export type RecommendationsQueryResult = ApolloReactCommon.QueryResult<RecommendationsQuery, RecommendationsQueryVariables>;