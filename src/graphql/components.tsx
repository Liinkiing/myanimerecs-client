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
  /** I am the title description */
  readonly title: Maybe<Scalars['String']>,
  /** I am the url description */
  readonly url: Maybe<Scalars['String']>,
  /** I am the imageUrl description */
  readonly imageUrl: Maybe<Scalars['String']>,
  /** Get a list of anime recommendations that explains why the anime has been recommended. */
  readonly from: ReadonlyArray<FromAnimeRecommendation>,
};


/** An Anime */
export type AnimeFromArgs = {
  first?: Maybe<Scalars['Int']>
};

/** An Anime recommendation from a viewer perspective that explain why an anime has been recommended */
export type FromAnimeRecommendation = {
  __typename?: 'FromAnimeRecommendation',
  /** Get the anime that made this recommendation relevant */
  readonly anime: Anime,
  /** The higher the score is, the higher it will be recommended */
  readonly score: Scalars['Int'],
};

export type Query = {
  __typename?: 'Query',
  /** Get the animelist of a user */
  readonly animelist: ReadonlyArray<Maybe<Anime>>,
  /** Get recommendations */
  readonly recommendations: ReadonlyArray<Maybe<Anime>>,
};


export type QueryAnimelistArgs = {
  username: Scalars['String']
};


export type QueryRecommendationsArgs = {
  username: Scalars['String']
};
export type RecommendationsList_RecommendationFragment = (
  { readonly __typename?: 'Anime' }
  & Pick<Anime, 'title' | 'url' | 'malId' | 'imageUrl'>
);

export type RecommendationsQueryVariables = {
  username: Scalars['String']
};


export type RecommendationsQuery = (
  { readonly __typename?: 'Query' }
  & { readonly recommendations: ReadonlyArray<Maybe<{ readonly __typename?: 'Anime' }
    & RecommendationsList_RecommendationFragment
  >> }
);
export const RecommendationsList_RecommendationFragmentDoc = gql`
    fragment RecommendationsList_recommendation on Anime {
  title
  url
  malId
  imageUrl
}
    `;
export const RecommendationsDocument = gql`
    query Recommendations($username: String!) {
  recommendations(username: $username) {
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