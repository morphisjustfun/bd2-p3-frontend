import {Container, Image, Tooltip} from "@nextui-org/react";

export default function ImageBlock({imageUrl, distance}) {
    console.log(distance);
    return (
        <Tooltip content={distance} color="secondary">
            <Container css={{
                display: 'flex',
                justifyContent: 'center',
                margin: 20,
            }}>
                <Image objectFit="cover"
                       src={imageUrl ?? "https://www.pacifictrellisfruit.com/wp-content/uploads/2016/04/default-placeholder-300x300.png"}
                       width={250} height={250}
                       showSkeleton
                       css={{
                           borderRadius: 20,
                       }}/>
            </Container>
        </Tooltip>
    );
}