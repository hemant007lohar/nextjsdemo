import { gql } from "@apollo/client";
import client from "client";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPageStaticProps = async (context) => {
  console.log("CONTEXT: ", context);
  const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";

  try {
    const { data } = await client.query({
      query: gql`
        query PageQuery($uri: String!) {
          nodeByUri(uri: $uri) {
            ... on Page {
              id
              title
              blocks(postTemplate: false)
              seo {
                title
                metaDesc
              }
            }
            ... on Property {
              id
              title
              blocks(postTemplate: false)
              seo {
                title
                metaDesc
              }
            }
          }
          acfOptionsMainMenu {
            mainMenu {
              callToActionButton {
                label
                destination {
                  ... on Page {
                    uri
                  }
                }
              }
              menuItems {
                menuItem {
                  destination {
                    ... on Page {
                      uri
                    }
                  }
                  label
                }
                items {
                  destination {
                    ... on Page {
                      uri
                    }
                  }
                  label
                }
              }
            }
          }
        }
      `,
      variables: { uri },
    });

    const node = data.nodeByUri;
    const blocks = node ? cleanAndTransformBlocks(node.blocks) : [];

    return {
      props: {
        seo: data.nodeByUri.seo,
        mainMenuItems: data.acfOptionsMainMenu?.mainMenu
          ? mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems)
          : [],
        callToActionLabel: data.acfOptionsMainMenu?.mainMenu?.callToActionButton?.label || "",
        callToActionDestination: data.acfOptionsMainMenu?.mainMenu?.callToActionButton?.destination?.uri || "",
        blocks,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true, // or you can return a fallback data structure
    };
  }
};