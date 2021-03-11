FROM openjdk:11
VOLUME /tmp
EXPOSE 8080
ADD ./target/abcatalog-0.0.1-SNAPSHOT.jar abcatalog.jar
ENTRYPOINT ["java", "-jar", "./abcatalog.jar"]